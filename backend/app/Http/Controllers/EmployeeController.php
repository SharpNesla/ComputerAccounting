<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
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
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
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
     * @return [string] message
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
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function querySave(array $object, Model $model): Model
    {
        if (array_key_exists('password', $object) &&
            array_key_exists('password_repeat', $object) &&
            $object['password'] == $object['password_repeat']){
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

    public function validateEntity(array $array) : bool
    {
        return Validator::make($array,[
            'superior_id' => 'required',
            'subsidiary_id' => 'required',

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
}
