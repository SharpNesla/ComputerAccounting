<?php

namespace App\Http\Middleware;

use Closure;

class Role
{
    /**
     * Handle an incoming request.
     *
     * @param string $role
     * @return mixed
     */
    private function decodeRole(string $role)
    {
        $dict = [
            'director' => 0,
            'branchDirector' => 1,
            'leadAdmin' => 2,
            'branchAdmin' => 4,
            'responsible' => 5,
            'storeKeepr' => 6];
        return $dict[$role];

    }

    public function handle($request, Closure $next, string $role)
    {

        if ($request->user()->role != $this->decodeRole($role)) {
            return response('Forbidden,', 403);
        }
        return $next($request);
    }
}
