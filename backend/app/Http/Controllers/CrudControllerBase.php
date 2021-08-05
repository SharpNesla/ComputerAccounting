<?php


namespace App\Http\Controllers;

use App\FulltextBuilder;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

/**
 CrudControllerBase is a class that provides
 basic CRUD functionality to child controllers.
 */
class CrudControllerBase extends Controller
{
    /**
     * Protected variable stores Laravel
     * Eloquent model's facade instance.
     * @var
     */
    protected $facade;
    /**
     * @var FulltextBuilder
     */
    protected $fulltextBuilder;


    /**
     * CrudControllerBase constructor.
     * @param $f
     * @param string[] $s
     */
    function __construct($f, $s = ['id'])
    {
        $this->facade = $f;
        $this->fulltextBuilder = new FulltextBuilder($s);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function getById($id)
    {
        return $this->facade::findOrFail($id);
    }

    /**
     * @param Request $request
     * @param Builder $builder
     * @return Builder
     */
    protected function queryMany(Request $request, Builder $builder): Builder
    {
        return $builder;
    }

    /**
     * @param array $filter
     * @param Builder $builder
     * @return Builder
     */
    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        return $builder;
    }

    /**
     * @param array $object
     * @param Model $model
     * @return Model
     */
    protected function querySave(Array $object, Model $model): Model
    {
        return $model;
    }

    /**
     * Function to validate sort order string.
     * @param $sortOrder
     * @return bool
     */
    private function validateSortOrder($sortOrder)
    {
        return $sortOrder != null && ($sortOrder == 'asc' ||
            $sortOrder == 'desc' ||
            $sortOrder == "");
    }

    /**
     * @param Request $request
     * @return Builder[]|\Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Query\Builder[]|JsonResponse|Collection
     */
    public function get(Request $request)
    {
        $sortOrder = $request->input('sort-order');
        $sortDefinition = $request->input('sort-definition');

        $sortQuery = null;
        if ($sortDefinition != null &&
            $this->validateSortOrder($sortOrder)) {

            $sortQuery = $this->facade::orderBy($sortDefinition, $sortOrder);
        } else {
            $sortQuery = $this->facade::orderBy('id');
        }

        $query = $this->queryMany($request, $sortQuery);


        $filter = json_decode($request->filter, true);

        if ($filter != null && $this->validateFilters($filter)) {
            $query = $this->applyFilters($filter, $query);
        }

        if ($request->input('search-string') != null &&
            $request->input('search-string') != '') {
            $query = $query->where($this->fulltextBuilder->search($request->input('search-string')));
        }

        $queryResult = $query
            ->skip($request->offset)
            ->take($request->limit)->get();

        if ($request->input('with-count')) {
            return response()->json([
                'entities' => $queryResult,
                'all_count' => $this->getCount($request),
            ]);
        }

        return $queryResult;
    }

    /**
     * Get count of entities by filter and search string.
     * @param Request $request
     * @return int
     */
    public function getCount(Request $request)
    {
        $query = $this->facade::orderBy('id');

        $filter = json_decode($request->filter, true);

        if ($filter != null && $this->validateFilters($filter)) {
            $query = $this->applyFilters($filter, $query);
        }

        if ($request->input('search-string') != null &&
            $request->input('search-string') != '') {

            $query = $query->where($this->fulltextBuilder->search($request->input('search-string')));
        }

        return $query->count();
    }

    /**
     * Virtual function to validate entity.
     * @param array $array
     * @return bool
     */
    protected function validateEntity(array $array): bool
    {
        return true;
    }

    /**
     * Virtual function to validate filters
     * @param array $filterA
     * @return bool
     */
    protected function validateFilters(array $filterA): bool
    {
        return true;
    }

    /**
     * Update entity request handler.
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function update(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        if ($decodedAsArray == null) {
            return response("Corrupted request body", 400);
        }
        if (!$this->validateEntity($decodedAsArray)) {
            return response("Invalid entity", 400);
        }
        $model = $this->facade::find($decodedAsArray['id']);
        $model->fill($decodedAsArray);
        $model = $this->querySave($decodedAsArray, $model);
        $model->save();
        return response("", 200);
    }

    /**
     * Add entity request handler.
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function add(Request $request)
    {
        $decodedAsArray = json_decode($request->getContent(), true);
        if ($decodedAsArray == null) {
            return response("Corrupted request body", 400);
        }
        if (!$this->validateEntity($decodedAsArray)) {
            return response("Invalid entity", 400);
        }

        $model = $this->facade::create($decodedAsArray);
        $model = $this->querySave($decodedAsArray, $model);
        $model->save();

        return response($model->id, 200);
    }

    /**
     * Soft remove entity from application.
     * @param $id
     */
    public function remove($id)
    {
        $model = $this->facade::destroy($id);
    }
}
