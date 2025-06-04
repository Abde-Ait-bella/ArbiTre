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
use App\Http\Controllers\PenaltyController;
use App\Http\Controllers\SaisonController;
use App\Http\Controllers\SettingsController;
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
Route::get('/matche' , [matcheController::class, 'index'])->middleware(['auth.api']);
Route::post('/matche' , [matcheController::class, 'store'])->middleware(['auth.api']);
Route::put('/matche/{id}' , [matcheController::class, 'update'])->middleware(['auth.api']);
Route::delete('/matche/{id}' , [matcheController::class, 'destroy'])->middleware(['auth.api']);


// Route::apiResource('avertissemet', AvertissementCotroller::class);

Route::get('/avertissement' , [AvertissementCotroller::class, 'index'])->middleware(['auth.api']);
Route::post('/avertissement' , [AvertissementCotroller::class, 'store'])->middleware(['auth.api']);
Route::put('/avertissement/{id}' , [AvertissementCotroller::class, 'update'])->middleware(['auth.api']);
Route::delete('/avertissement/{id}' , [AvertissementCotroller::class, 'destroy'])->middleware(['auth.api']);

// Route::apiResource('changement', ChangementCotroller::class);

Route::get('/changement' , [ChangementCotroller::class, 'index'])->middleware(['auth.api']);
Route::post('/changement' , [ChangementCotroller::class, 'store'])->middleware(['auth.api']);
Route::put('/changement/{id}' , [ChangementCotroller::class, 'update'])->middleware(['auth.api']);
Route::delete('/changement/{id}' , [ChangementCotroller::class, 'destroy'])->middleware(['auth.api']);

Route::get('/but' , [ButsController::class, 'index'])->middleware(['auth.api']);
Route::post('/but' , [ButsController::class, 'store'])->middleware(['auth.api']);
Route::put('/but/{id}' , [ButsController::class, 'update'])->middleware(['auth.api']);
Route::delete('/but/{id}' , [ButsController::class, 'destroy'])->middleware(['auth.api']);

//Arbitre
Route::get('/arbitre' , [ArbitreController::class, 'index'])->middleware(['auth.api']);
Route::post('/arbitre' , [ArbitreController::class, 'store'])->middleware(['auth.api']);
Route::put('/arbitre/{id}' , [ArbitreController::class, 'update'])->middleware(['auth.api']);
Route::delete('/arbitre/{id}' , [ArbitreController::class, 'destroy'])->middleware(['auth.api']);

//Delegue
Route::get('/delegue' , [delegueController::class, 'index'])->middleware(['auth.api']);
Route::post('/delegue' , [delegueController::class, 'store'])->middleware(['auth.api']);
Route::put('/delegue/{id}' , [delegueController::class, 'update'])->middleware(['auth.api']);
Route::delete('/delegue/{id}' , [delegueController::class, 'destroy'])->middleware(['auth.api']);

//Club
Route::get('/club' , [ClubController::class, 'index'])->middleware(['auth.api']);
Route::post('/club' , [ClubController::class, 'store'])->middleware(['auth.api']);
Route::delete('/club/{id}' , [ClubController::class, 'destroy'])->middleware(['auth.api']);
Route::put('/club/{id}' , [ClubController::class, 'update'])->middleware(['auth.api']);


//Stade
Route::get('/stade' , [StadeController::class, 'index'])->middleware(['auth.api']);
Route::post('/stade' , [StadeController::class, 'store'])->middleware(['auth.api']);
Route::put('/stade/{id}', [StadeController::class, 'update'])->middleware(['auth.api']);
Route::delete('/stade/{id}' , [StadeController::class, 'destroy'])->middleware(['auth.api']);

// villes
Route::get('/ville' , [VilleController::class, 'index'])->middleware(['auth.api']);
Route::post('/ville' , [VilleController::class, 'store'])->middleware(['auth.api']);
Route::put('/ville/{id}', [VilleController::class, 'update'])->middleware(['auth.api']);
Route::delete('/ville/{id}' , [VilleController::class, 'destroy'])->middleware(['auth.api']);

//competitions
Route::get('/competition' , [CompetitionController::class, 'index'])->middleware(['auth.api']);

//saison
Route::get('/saison' , [SaisonController::class, 'index'])->middleware(['auth.api']);

//category
Route::get('/category' , [CategoryController::class, 'index'])->middleware(['auth.api']);

//joueur
Route::get('/joueur' , [JoueurController::class, 'index'])->middleware(['auth.api']);
Route::post('/joueur' , [JoueurController::class, 'store'])->middleware(['auth.api']);
Route::put('/joueur/{id}', [JoueurController::class, 'update'])->middleware(['auth.api']);
Route::delete('/joueur/{id}' , [JoueurController::class, 'destroy'])->middleware(['auth.api']);

//penalty
Route::get('/penalty' , [PenaltyController::class, 'index'])->middleware(['auth.api']);
Route::post('/penalty' , [PenaltyController::class, 'store'])->middleware(['auth.api']);
Route::put('/penalty/{id}', [PenaltyController::class, 'update'])->middleware(['auth.api']);
Route::delete('/penalty/{id}' , [PenaltyController::class, 'destroy'])->middleware(['auth.api']);

//change_password
Route::post('/change_password' , [SettingsController::class, 'updatePassword'])->middleware(['auth.api']);

//change_name
Route::post('/change_name' , [SettingsController::class, 'updateName'])->middleware(['auth.api']);

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('sendPasswordResetLink', 'App\Http\Controllers\PasswordResetRequestController@sendEmail');
    Route::post('resetPassword', 'App\Http\Controllers\ChangePasswordController@passwordResetProcess');
});

Route::get('/users', function (Request $request) {
    $users = \App\Models\User::all();
    return response()->json([
        'status' => 'success',
        'data' => $users,
    ]); 
})->middleware('auth:api');

require __DIR__.'/auth.php';

