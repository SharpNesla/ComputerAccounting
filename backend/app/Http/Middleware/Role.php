<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

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
     * @param string $role
     * @return mixed
     */
    private function decodeRole(string $role)
    {

        return $this->dict[$role];
    }

    public function handle($request, Closure $next, string $role)
    {
        if (!Auth::check())
            return response('Unauthorized', 401);
        if ($request->user()->role != $this->decodeRole($role)) {
            return response('Forbidden', 403);
        }
        return $next($request);
    }
}
