<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Hash;
use App\Models\User;

class AuthController extends Controller
{
   
    public function registration(RegistrationRequest $request){

        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'message' => 'User created successfully'
        ],200);
    }

    public function login(LoginRequest $request){

        $data = $request->validated();
        $user = User::where('email', $data['email'])->first();
        if(!$user || !Hash::check($data['password'], $user->password)){
            return response()->json([
                'message' => 'Invalid Credentials!'
            ],401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully',
            'token'=> $token,
        ],200);
    }


    public function authorize(Request $request){
        return response()->json([
            'success' => true,
            'authenticated' => true,
            'user' => $request->user(),
        ],200);
    }

}
