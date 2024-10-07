<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Response\GeneralResponse;

class AuthController extends Controller
{
    protected $auth;

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(\Illuminate\Contracts\Auth\Factory $auth)
    {
        $this->auth = $auth;
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /**
     * @OA\Post(
     *     path="/api/login",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="password", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(response="200", description="Login successful"),
     *     @OA\Response(response="401", description="Unauthorized"),
     * )
     */
    public function login(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        $credentials = $request->only('email', 'password');

        if (!$token = $this->auth->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'error_code' => 401,
                'message' => 'Unauthorized'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->auth->user());
    }


    /**
     * @OA\Post(
     *     path="/refresh",
     *     @OA\Response(response="200", description="Token refreshed"),
     * )
     */
    public function refresh()
    {
        return $this->respondWithToken($this->auth->refresh());
    }

    /**
     * @OA\Post(
     *     path="/api/register",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "username", "firstname", "lastname", "password", "password_confirmation"},
     *             @OA\Property(property="email", type="string", format="email", example="user@example.com"),
     *             @OA\Property(property="username", type="string", example="user123"),
     *             @OA\Property(property="firstname", type="string", example="John"),
     *             @OA\Property(property="lastname", type="string", example="Doe"),
     *             @OA\Property(property="password", type="string", format="password", example="password123"),
     *             @OA\Property(property="password_confirmation", type="string", format="password", example="password123")
     *         )
     *     ),
     *     @OA\Response(response="201", description="User registered successfully"),
     *     @OA\Response(response="400", description="Validation Error"),
     * )
     */
    public function register(Request $request)
    {
        $this->validate($request, [
            'email' => 'required|email|unique:users',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'password' => 'required|string|min:6|confirmed', 
        ]);

        $userController = new UserController;
        return $userController->store($request);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $this->auth->refresh(),
            'token_type' => 'bearer',
            'expires_in' => $this->auth->factory()->getTTL() * 60,
            'user' => $this->auth->user(),
        ]);
    }
}
