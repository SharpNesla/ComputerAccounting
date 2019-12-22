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
        'admin' => 2,
        'branchAdmin' => 4,
        'responsible' => 5,
        'storeKeeper' => 6
    ];

    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @param array $roles
     * @return mixed
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        $convertedRoles = array_map(function ($role) {
            return $this->dict[$role];
        }, $roles);
        if (!in_array($request->user()->role, $convertedRoles)) {
            return response('Forbidden', 403);
        }
        return $next($request);
    }
}
