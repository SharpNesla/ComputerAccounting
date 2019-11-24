<?php

namespace App\Http\Controllers;

use App\Computer;
use App\User;

class EmployeeController extends CrudControllerBase
{
    function __construct() {
        parent::__construct(User::class);
    }
    /*public function login()
    {

        $credentials = request(['username', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type'   => 'bearer',
            'expires_in'   => auth()->factory()->getTTL() * 60
        ]);
    }


    public function username()
    {
        return 'username';
    }*/
}
