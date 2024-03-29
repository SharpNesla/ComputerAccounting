<?php

namespace App\Http\Controllers;

use App\Computer;
use App\License;
use App\Software;
use App\Subsidiary;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends CrudControllerBase
{
    public function __construct()
    {
        parent::__construct(User::class, ['id', 'name', 'surname', 'patronymic']);
    }

    /**
     * Login user and create token
     *
     * @param Request $request
     * @return JsonResponse [string] access_token
     */
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['username', 'password']);

        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Invalid credentials'
            ], 403);

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @param Request $request
     * @return JsonResponse [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @param Request $request
     * @return JsonResponse [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function changeColorScheme(Request $request)
    {
        $user = $request->user();
        $user->color_scheme = $request->scheme;
        $user->save();
    }

    public function querySave(array $object, Model $model): Model
    {
        if (array_key_exists('password', $object) &&
            array_key_exists('password_repeat', $object) &&
            $object['password'] == $object['password_repeat']) {
            $model->password = bcrypt($object['password']);
        }
        return parent::querySave($object, $model);
    }

    public function getById($id)
    {
        return User::with('superior')
            ->with('subsidiary')
            ->findOrFail($id);
    }

    protected function applyFilters(array $filter, Builder $builder): Builder
    {
        if (array_key_exists('using_computers_count_low_bound', $filter)) {
            $builder = $builder
                ->has('computers', '>=', $filter['using_computers_count_low_bound']);
        }

        if (array_key_exists('using_computers_count_high_bound', $filter)) {
            $builder = $builder
                ->has('computers', '<=', $filter['using_computers_count_high_bound']);
        }

        if (array_key_exists('role', $filter)) {
            $builder = $builder->where('role', $filter['role']);
        }

        if (array_key_exists('superior_id', $filter)) {
            $builder = $builder->where('superior_id', $filter['superior_id']);
        }

        if (array_key_exists('subsidiary_id', $filter)) {
            $builder = $builder->where('subsidiary_id', $filter['subsidiary_id']);
        }

        return $builder;
    }

    /**
     * Get full tree of employees,
     * @param Request $request
     * @return false|string
     */
    public function getTree(Request $request)
    {
        $employees = $this
            ->queryMany($request, User::orderBy('id'))
            ->get();

        if ($request->exclude != null) {

        }

        $root = $this->fetchChildrenRecursively($employees[0], $employees);

        return json_encode($root);
    }

    private function fetchChildrenRecursively($subRoot, $collection)
    {
        $children =
            $this->FetchChildren($subRoot, $collection)->map(function ($x) use ($collection) {
                return $this->fetchChildrenRecursively($x, $collection);
            });
        $subRoot['subordinates'] = array_values($children->toArray());
        return $subRoot;
    }

    public function FetchChildren($root, $collection)
    {
        return $collection->filter(function ($child) use ($root) {
            return $child['superior_id'] == $root['id'];
        });
    }

    public function validateEntity(array $array): bool
    {
        return !Validator::make($array, [
            'name' => 'required',
            'surname' => 'required',
            'patronymic' => 'required',

            'gender' => 'required|numeric|min:0|max:2',
            'role' => 'required|numeric|min:0|max:5',

            'passport_serial' => 'required',
            'address' => 'required',

            'username' => 'required'
        ])->fails();
    }


    public function getDirectorDashboardInfo()
    {
        return [
            'computers-count' => Computer::query()->count(),
            'software-count' => Software::query()->count(),
            'licenses-count' => License::query()->count(),
            'subsidiaries-count' => Subsidiary::query()->count(),

            'employees-count' => User::query()->count(),
            'responsible-count' => User::query()->where('role', 4)->count(),
            'storekeeper-count' => User::query()->where('role', 5)->count(),
            'admin-count' => User::query()->where('role', 2)->count(),
            'branch-admin-count' => User::query()->where('role', 3)->count()
        ];
    }

    public function getBranchDirectorDashboardInfo()
    {
        return [
            'computers-count' => Computer::query()->count(),
            'software-count' => Software::query()->count(),
            'licenses-count' => License::query()->count(),

            'employees-count' => User::query()->count(),
            'responsible-count' => User::query()->where('role', 4)->count(),
            'storekeeper-count' => User::query()->where('role', 5)->count(),
            'branch-admin-count' => User::query()->where('role', 3)->count()
        ];
    }
}
