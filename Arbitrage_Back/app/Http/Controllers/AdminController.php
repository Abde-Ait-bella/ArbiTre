<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Arbitre;
use App\Models\Club;
use App\Models\Matche;
use App\Models\Category;
use App\Models\Stade;
use App\Models\Ville;
use App\Models\Joueur;
use App\Models\Delegue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    /**
     * Obtenir les statistiques générales pour le tableau de bord
     */
    public function getStats()
    {
        $stats = [
            'total_users' => User::count(),
            'total_arbitres' => Arbitre::count(),
            'total_clubs' => Club::count(),
            'total_matches' => Matche::count(),
            'total_stades' => Stade::count(),
            'total_villes' => Ville::count(),
            'total_joueurs' => Joueur::count(),
            'total_delegues' => Delegue::count(),
            'active_users' => User::where('status', 'active')->count(),
            'inactive_users' => User::where('status', '!=', 'active')->orWhereNull('status')->count(),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $stats,
        ]);
    }

    /**
     * Obtenir une vue d'ensemble des données récentes
     */
    public function getOverview()
    {
        $data = [
            'recent_matches' => Matche::with(['stade.ville', 'ville', 'delegue.ville', 'competition', 'saison'])
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get(),
            'recent_arbitres' => Arbitre::with('ville')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get(),
            'recent_clubs' => Club::with('stade', 'stade.ville')
                ->orderBy('created_at', 'desc')
                ->limit(10)
                ->get(),
        ];
        
        return response()->json([
            'status' => 'success',
            'data' => $data,
        ]);
    }

    /**
     * Obtenir les statistiques des matches par mois
     */
    public function getMatchesByMonth()
    {
        $months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
        
        // Récupérer le nombre de matches par mois pour l'année en cours
        $matchesByMonth = Matche::select(DB::raw('MONTH(created_at) as month'), DB::raw('COUNT(*) as count'))
            ->whereYear('created_at', date('Y'))
            ->groupBy('month')
            ->get()
            ->pluck('count', 'month')
            ->toArray();
        
        // Préparer les données au format attendu par le frontend
        $data = [];
        for ($i = 1; $i <= 12; $i++) {
            $data[] = $matchesByMonth[$i] ?? 0;
        }
        
        return response()->json([
            'labels' => $months,
            'data' => $data
        ]);
    }

    /**
     * Obtenir les statistiques des arbitres
     */
    public function getRefereeStats()
    {
        // Récupérer les 5 arbitres les plus actifs
        // Note: cela suppose que votre modèle Arbitre a une relation avec les matches
        $referees = Arbitre::select('arbitres.id', 'arbitres.nom', 'arbitres.prenom', DB::raw('COUNT(matches.id) as match_count'))
            ->leftJoin('matches', function ($join) {
                $join->on('arbitres.id', '=', 'matches.arbitre_c_id')
                    ->orOn('arbitres.id', '=', 'matches.arbitre_a1_id')
                    ->orOn('arbitres.id', '=', 'matches.arbitre_a2_id')
                    ->orOn('arbitres.id', '=', 'matches.arbitre_4_id');
            })
            ->groupBy('arbitres.id', 'arbitres.nom', 'arbitres.prenom')
            ->orderBy('match_count', 'desc')
            ->limit(5)
            ->get();
        
        $labels = $referees->map(function ($referee) {
            return $referee->nom . ' ' . $referee->prenom;
        })->toArray();
        
        $data = $referees->pluck('match_count')->toArray();
        
        return response()->json([
            'labels' => $labels,
            'data' => $data
        ]);
    }

    /**
     * Obtenir les statistiques des catégories
     */
    public function getCategoryStats()
    {
        // Récupérer le nombre de matches par catégorie
        $categories = Category::select('categories.id', 'categories.nom', DB::raw('COUNT(matches.id) as match_count'))
            ->leftJoin('matches', 'categories.id', '=', 'matches.categorie_id')
            ->groupBy('categories.id', 'categories.nom')
            ->get();
        
        return response()->json([
            'labels' => $categories->pluck('nom')->toArray(),
            'data' => $categories->pluck('match_count')->toArray()
        ]);
    }

    /**
     * Obtenir les statistiques des utilisateurs
     */
    public function getUserStats()
    {
        $days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        
        // Obtenir les statistiques d'activité réelles basées sur les matches créés par jour de la semaine
        $activityByDay = Matche::select(DB::raw('DAYOFWEEK(created_at) as day_of_week'), DB::raw('COUNT(*) as count'))
            ->whereNotNull('user_id')
            ->groupBy('day_of_week')
            ->get()
            ->pluck('count', 'day_of_week')
            ->toArray();
        
        // MySQL DAYOFWEEK() retourne 1 pour Dimanche, 2 pour Lundi, etc.
        // Convertir à notre format de tableau 0-6 (où 0 est Dimanche)
        $data = [];
        for ($i = 1; $i <= 7; $i++) {
            $data[] = $activityByDay[$i] ?? 0;
        }
        
        // Si aucune donnée n'est disponible, récupérer plutôt les connexions récentes via personal_access_tokens
        if (array_sum($data) == 0) {
            $activityByDay = DB::table('personal_access_tokens')
                ->select(DB::raw('DAYOFWEEK(last_used_at) as day_of_week'), DB::raw('COUNT(*) as count'))
                ->whereNotNull('last_used_at')
                ->groupBy('day_of_week')
                ->get()
                ->pluck('count', 'day_of_week')
                ->toArray();
            
            $data = [];
            for ($i = 1; $i <= 7; $i++) {
                $data[] = $activityByDay[$i] ?? 0;
            }
        }
        
        return response()->json([
            'labels' => $days,
            'data' => $data
        ]);
    }

    /**
     * Obtenir le nombre total d'utilisateurs
     */
    public function getUserCount()
    {
        return User::count();
    }

    /**
     * Obtenir le nombre total de matches
     */
    public function getMatchCount()
    {
        return Matche::count();
    }

    /**
     * Obtenir le nombre total de clubs
     */
    public function getClubCount()
    {
        return Club::count();
    }

    /**
     * Obtenir le nombre total d'arbitres
     */
    public function getRefereeCount()
    {
        return Arbitre::count();
    }

    /**
     * Obtenir le nombre de matches par utilisateur
     */
    public function getUserMatchesStats()
    {
        // Récupérer les utilisateurs avec le compte de matches
        $users = User::select('users.id', 'users.name', DB::raw('COUNT(matches.id) as match_count'))
            ->leftJoin('matches', 'users.id', '=', 'matches.user_id')
            ->groupBy('users.id', 'users.name')
            ->orderBy('match_count', 'desc')
            ->limit(8)
            ->get();
        
        $labels = $users->pluck('name')->toArray();
        $data = $users->pluck('match_count')->toArray();
        
        return response()->json([
            'labels' => $labels,
            'data' => $data
        ]);
    }
}
