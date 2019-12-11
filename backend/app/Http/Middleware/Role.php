<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class Role
{
    private $dict = [
        'director' => 0,
        'branchDirector' => 1,
        'leadAdmin' => 2,
        'branchAdmin' => 4,
        'responsible' => 5,
        'storeKeeper' => 6];

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param string $role
     * @return mixed
     */
    public function handle(Request $request, Closure $next, string $role)
    {
        if ($request->user()->role != $this->dict[$role]) {
            return response('Forbidden', 403);
        }
        return $next($request);
    }
}
