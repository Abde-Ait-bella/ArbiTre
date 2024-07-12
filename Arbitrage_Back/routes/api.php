<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArbitreController;
use App\Http\Controllers\AvertissementCotroller;
use App\Http\Controllers\ButsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\change_passwordController;
use App\Http\Controllers\ChangementCotroller;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\delegueController;
use App\Http\Controllers\JoueurController;
use App\Http\Controllers\matcheController;
use App\Http\Controllers\SaisonController;
use App\Http\Controllers\StadeController;
use App\Http\Controllers\VilleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//->middleware('auth:sanctum')
Route::get('/matche' , [matcheController::class, 'index'])->middleware('auth');
Route::post('/matche' , [matcheController::class, 'store'])->middleware('auth');
Route::put('/matche/{id}' , [matcheController::class, 'update'])->middleware('auth');
Route::delete('/matche/{id}' , [matcheController::class, 'destroy'])->middleware('auth');


// Route::apiResource('avertissemet', AvertissementCotroller::class);

Route::get('/avertissement' , [AvertissementCotroller::class, 'index'])->middleware('auth');
Route::post('/avertissement' , [AvertissementCotroller::class, 'store'])->middleware('auth');
Route::put('/avertissement/{id}' , [AvertissementCotroller::class, 'update'])->middleware('auth');
Route::delete('/avertissement/{id}' , [AvertissementCotroller::class, 'destroy'])->middleware('auth');

// Route::apiResource('changement', ChangementCotroller::class);

Route::get('/changement' , [ChangementCotroller::class, 'index'])->middleware('auth');
Route::post('/changement' , [ChangementCotroller::class, 'store'])->middleware('auth');
Route::put('/changement/{id}' , [ChangementCotroller::class, 'update'])->middleware('auth');
Route::delete('/changement/{id}' , [ChangementCotroller::class, 'destroy'])->middleware('auth');

Route::get('/but' , [ButsController::class, 'index'])->middleware('auth');
Route::post('/but' , [ButsController::class, 'store'])->middleware('auth');
Route::put('/but/{id}' , [ButsController::class, 'update'])->middleware('auth');
Route::delete('/but/{id}' , [ButsController::class, 'destroy'])->middleware('auth');

//Arbitre
Route::get('/arbitre' , [ArbitreController::class, 'index'])->middleware('auth');
Route::post('/arbitre' , [ArbitreController::class, 'store'])->middleware('auth');
Route::put('/arbitre/{id}' , [ArbitreController::class, 'update'])->middleware('auth');
Route::delete('/arbitre/{id}' , [ArbitreController::class, 'destroy'])->middleware('auth');

//Delegue
Route::get('/delegue' , [delegueController::class, 'index'])->middleware('auth');
Route::post('/delegue' , [delegueController::class, 'store'])->middleware('auth');
Route::put('/delegue/{id}' , [delegueController::class, 'update'])->middleware('auth');
Route::delete('/delegue/{id}' , [delegueController::class, 'destroy'])->middleware('auth');

//Club
Route::get('/club' , [ClubController::class, 'index'])->middleware('auth');
Route::post('/club' , [ClubController::class, 'store'])->middleware('auth');
Route::delete('/club/{id}' , [ClubController::class, 'destroy'])->middleware('auth');
Route::put('/club/{id}' , [ClubController::class, 'update'])->middleware('auth');


//Stade
Route::get('/stade' , [StadeController::class, 'index'])->middleware('auth');
Route::post('/stade' , [StadeController::class, 'store'])->middleware('auth');
Route::put('/stade/{id}', [StadeController::class, 'update'])->middleware('auth');
Route::delete('/stade/{id}' , [StadeController::class, 'destroy'])->middleware('auth');

// villes
Route::get('/ville' , [VilleController::class, 'index'])->middleware('auth');
Route::post('/ville' , [VilleController::class, 'store'])->middleware('auth');
Route::put('/ville/{id}', [VilleController::class, 'update'])->middleware('auth');
Route::delete('/ville/{id}' , [VilleController::class, 'destroy'])->middleware('auth');

//competitions
Route::get('/competition' , [CompetitionController::class, 'index'])->middleware('auth');

//saison
Route::get('/saison' , [SaisonController::class, 'index'])->middleware('auth');

//category
Route::get('/category' , [CategoryController::class, 'index'])->middleware('auth');

//joueur
Route::get('/joueur' , [JoueurController::class, 'index'])->middleware('auth');
Route::post('/joueur' , [JoueurController::class, 'store'])->middleware('auth');
Route::put('/joueur/{id}', [JoueurController::class, 'update'])->middleware('auth');
Route::delete('/joueur/{id}' , [JoueurController::class, 'destroy'])->middleware('auth');

//change_password
Route::post('/change_password' , [change_passwordController::class, 'update'])->middleware('auth');


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('sendPasswordResetLink', 'App\Http\Controllers\PasswordResetRequestController@sendEmail');
    Route::post('resetPassword', 'App\Http\Controllers\ChangePasswordController@passwordResetProcess');
});

// Route::controller(TodoController::class)->group(function () {
//     Route::get('todos', 'index');
//     Route::post('todo', 'store');
//     Route::get('todo/{id}', 'show');
//     Route::put('todo/{id}', 'update');
//     Route::delete('todo/{id}', 'destroy');
// });
// Route::get('/csrf-token', function () {
//     return response()->json(['token' => csrf_token()]);
// });
require __DIR__.'/auth.php';

