<?php

namespace App;

use Closure;
use Illuminate\Database\Query\Expression;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;


class FulltextBuilder
{
    /**
     * The columns to be searched.
     *
     * @var null
     */
    protected $columns = null;

    /**
     * FulltextBuilder constructor.
     *
     * @param string|array $columns
     */
    function __construct($columns)
    {
        $this->setColumns($columns);
    }

    /**
     * Set the columns to be searched.
     *
     * @param string|array $columns
     */
    public function setColumns($columns)
    {
        $this->columns = Arr::wrap($columns);
    }

    /**
     * Build a closure to search keywords.
     *
     * @param string $keywords
     * @return Closure
     */
    public function search(string $keywords)
    {
        $searchRegexp = $this->makeSearchRegexp($keywords);
        $searchVector = $this->makeSearchVector($this->columns);
        return function ($query) use ($searchRegexp, $searchVector) {
            $query->whereRaw("$searchVector ~* '$searchRegexp'");
        };
    }

    /**
     * Create a plain fulltext query string.
     *
     * @param string $searchString
     * @return string
     */
    protected function makeSearchRegexp(string $searchString): string
    {
        $searchChunks = preg_split('/\s+/' ,$searchString);

        $regex = "^";

        foreach ($searchChunks as $searchChunk)
        {
          $regex .= "(?=.*$searchChunk)";
        }

        $regex .= ".*$";
        return $regex;
    }

    /**
     * Concatenate an array of column values into a united string.
     *
     * @param array $columns
     * @return string
     */
    protected function makeSearchVector(array $columns): string
    {
        $columns = array_map(function ($arg){return $arg."::text";}, $columns);
        return implode("|| ' ' ||", $columns);
    }
}
