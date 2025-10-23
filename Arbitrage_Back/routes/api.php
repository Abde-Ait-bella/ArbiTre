<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArbitreController;
use App\Http\Controllers\AvertissementCotroller;
use App\Http\Controllers\ButsController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\change_passwordController;
use App\Http\Controllers\ChangementController;
use App\Http\Controllers\ClubController;
use App\Http\Controllers\CompetitionController;
use App\Http\Controllers\delegueController;
use App\Http\Controllers\JoueurController;
use App\Http\Controllers\matcheController;
use App\Http\Controllers\PenaltyController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SaisonController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StadeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VilleController;
use App\Http\Controllers\AdminController;
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
Route::get('/matche' , [matcheController::class, 'index'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::post('/matche' , [matcheController::class, 'store'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::put('/matche/{id}' , [matcheController::class, 'update'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::delete('/matche/{id}' , [matcheController::class, 'destroy'])->middleware(['auth.api', 'checkStatus:accepted']);


// Group all protected routes with auth and status check
Route::middleware(['auth.api', 'checkStatus:accepted'])->group(function () {
    // Avertissement routes
    Route::get('/avertissement', [AvertissementCotroller::class, 'index']);
    Route::post('/avertissement', [AvertissementCotroller::class, 'store']);
    Route::put('/avertissement/{id}', [AvertissementCotroller::class, 'update']);
    Route::delete('/avertissement/{id}', [AvertissementCotroller::class, 'destroy']);

    // Changement routes
    Route::get('/changement', [ChangementController::class, 'index']);
    Route::post('/changement', [ChangementController::class, 'store']);
    Route::put('/changement/{id}', [ChangementController::class, 'update']);
    Route::delete('/changement/{id}', [ChangementController::class, 'destroy']);

    // But routes
    Route::get('/but', [ButsController::class, 'index']);
    Route::post('/but', [ButsController::class, 'store']);
    Route::put('/but/{id}', [ButsController::class, 'update']);
    Route::delete('/but/{id}', [ButsController::class, 'destroy']);

    // Arbitre routes
    Route::get('/arbitre', [ArbitreController::class, 'index']);
    Route::post('/arbitre', [ArbitreController::class, 'store']);
    Route::put('/arbitre/{id}', [ArbitreController::class, 'update']);
    Route::delete('/arbitre/{id}', [ArbitreController::class, 'destroy']);

    // Delegue routes
    Route::get('/delegue', [delegueController::class, 'index']);
    Route::post('/delegue', [delegueController::class, 'store']);
    Route::put('/delegue/{id}', [delegueController::class, 'update']);
    Route::delete('/delegue/{id}', [delegueController::class, 'destroy']);

    // Club routes
    Route::get('/club', [ClubController::class, 'index']);
    Route::post('/club', [ClubController::class, 'store']);
    Route::delete('/club/{id}', [ClubController::class, 'destroy']);
    Route::put('/club/{id}', [ClubController::class, 'update']);

    // Stade routes
    Route::get('/stade', [StadeController::class, 'index']);
    Route::post('/stade', [StadeController::class, 'store']);
    Route::put('/stade/{id}', [StadeController::class, 'update']);
    Route::delete('/stade/{id}', [StadeController::class, 'destroy']);

    // Ville routes
    Route::get('/ville', [VilleController::class, 'index']);
    Route::post('/ville', [VilleController::class, 'store']);
    Route::put('/ville/{id}', [VilleController::class, 'update']);
    Route::delete('/ville/{id}', [VilleController::class, 'destroy']);

    // Competition routes
    Route::get('/competition', [CompetitionController::class, 'index']);

    // Saison routes
    Route::get('/saison', [SaisonController::class, 'index']);

    // Category routes
    Route::get('/category', [CategoryController::class, 'index']);

    // Joueur routes
    Route::get('/joueur', [JoueurController::class, 'index']);
    Route::post('/joueur', [JoueurController::class, 'store']);
    Route::put('/joueur/{id}', [JoueurController::class, 'update']);
    Route::delete('/joueur/{id}', [JoueurController::class, 'destroy']);

    // Penalty routes
    Route::get('/penalty', [PenaltyController::class, 'index']);
    Route::post('/penalty', [PenaltyController::class, 'store']);
    Route::put('/penalty/{id}', [PenaltyController::class, 'update']);
    Route::delete('/penalty/{id}', [PenaltyController::class, 'destroy']);
});


//Users - Routes CRUD complètes

Route::get('/users', [UserController::class, 'index'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::post('/users', [UserController::class, 'store'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::get('/users/{id}', [UserController::class, 'show'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::put('/users/{id}', [UserController::class, 'update'])->middleware(['auth.api', 'checkStatus:accepted']);
Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware(['auth.api', 'checkStatus:accepted']);

//change_password
Route::post('/change_password' , [SettingsController::class, 'updatePassword'])->middleware(['auth.api', 'checkStatus:accepted']);

//change_name
Route::post('/change_name' , [SettingsController::class, 'updateName'])->middleware(['auth.api', 'checkStatus:accepted']);

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::get('user/status', 'getUserStatus')->middleware('auth.api'); // Route pour vérifier le statut de l'utilisateur
    Route::post('sendPasswordResetLink', 'App\Http\Controllers\PasswordResetRequestController@sendEmail');
    Route::post('resetPassword', 'App\Http\Controllers\ChangePasswordController@passwordResetProcess');
});

// Dashboard Routes
Route::prefix('dashboard')->middleware(['auth.api', 'checkStatus:accepted'])->group(function () {
    // Statistiques générales
    Route::get('/stats', [AdminController::class, 'getStats']);
    Route::get('/overview', [AdminController::class, 'getOverview']);

    // Routes pour le panneau d'administration
    Route::prefix('admin')->group(function () {
        // Statistiques pour SuperAdminDashboard
        Route::get('/stats', [AdminController::class, 'getStats']);

        // Statistiques détaillées pour GlobalStatistics
        Route::prefix('statistics')->group(function () {
            // Statistiques des matches par mois
            Route::get('/matches', [AdminController::class, 'getMatchesByMonth']);
            Route::get('/referees', [AdminController::class, 'getRefereeStats']);
            Route::get('/categories', [AdminController::class, 'getCategoryStats']);
            Route::get('/users-matches', [AdminController::class, 'getUserMatchesStats']);
            Route::get('/device-usage', 'App\Http\Controllers\Api\DeviceStatisticsController@getDeviceUsage');
        });

        // Comptes rapides pour SuperAdminDashboard
        Route::get('/users/count', [AdminController::class, 'getUserCount']);
        Route::get('/matche/count', [AdminController::class, 'getMatchCount']);
        Route::get('/club/count', [AdminController::class, 'getClubCount']);
        Route::get('/arbitre/count', [AdminController::class, 'getRefereeCount']);
    });
});

// Routes pour récupérer les données avec pagination
Route::get('/arbitres/paginated', function (Request $request) {
    $perPage = $request->get('per_page', 15);
    $arbitres = \App\Models\Arbitre::with('ville')->paginate($perPage);
    return response()->json([
        'status' => 'success',
        'data' => $arbitres,
    ]);
})->middleware(['auth.api', 'checkStatus:accepted']);

Route::get('/clubs/paginated', function (Request $request) {
    $perPage = $request->get('per_page', 15);
    $clubs = \App\Models\Club::with('stade', 'stade.ville')->paginate($perPage);
    return response()->json([
        'status' => 'success',
        'data' => $clubs,
    ]);
})->middleware(['auth.api', 'checkStatus:accepted']);

Route::get('/matches/paginated', function (Request $request) {
    $perPage = $request->get('per_page', 15);
    $matches = \App\Models\Matche::with(['stade.ville', 'ville', 'delegue.ville', 'competition', 'saison'])
        ->paginate($perPage);
    return response()->json([
        'status' => 'success',
        'data' => $matches,
    ]);
})->middleware(['auth.api', 'checkStatus:accepted']);

// Routes API supplémentaires pour le front Admin
Route::prefix('admin')->middleware(['auth.api', 'checkStatus:accepted'])->group(function () {
    // Récupérer les utilisateurs par statut (utilise le contrôleur)
    Route::get('/users/active', [UserController::class, 'getActiveUsers']);
    Route::get('/users/inactive', [UserController::class, 'getInactiveUsers']);

    // Modifier le statut des utilisateurs (utilise le contrôleur)
    Route::post('/users/{id}/activate', [UserController::class, 'activate']);
    Route::post('/users/{id}/pending', [UserController::class, 'pending']);
    Route::post('/users/{id}/reject', [UserController::class, 'reject']);
    
    // Anciennes routes (gardées pour rétrocompatibilité) 
    // 'deactivate' est maintenant 'pending' (mise en attente)
    Route::post('/users/{id}/deactivate', [UserController::class, 'pending']);
    
    // Bulk update route
    Route::post('/users/bulk-status-update', [UserController::class, 'bulkUpdateStatus']);
    
    // Mise à jour du rôle utilisateur
    Route::post('/users/{id}/role', [UserController::class, 'updateRole']);
    
    // Anciennes routes (gardées pour rétrocompatibilité) 
    // 'deactivate' est maintenant 'pending' (mise en attente)
    Route::post('/users/{id}/deactivate', [UserController::class, 'pending']);
    
    // Mise à jour du rôle utilisateur
    Route::post('/users/{id}/role', [UserController::class, 'updateRole']);
});

Route::get('/rapport/{id}', [ReportController::class, 'generatePDF'])->middleware(['auth.api', 'checkStatus:accepted']);

require __DIR__.'/auth.php';

