<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckUserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string|null  $status  Statut requis (par défaut 'accepted')
     * @return mixed
     */
    public function handle($request, Closure $next, $status = 'accepted')
    {
        if (!auth()->check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non authentifié'
            ], 401);
        }

        $user = auth()->user();
        
        // Vérifier si l'utilisateur a le statut requis
        if ($user->status !== $status) {
            $statusMessages = [
                'accepted' => 'activé',
                'pending' => 'en attente de validation',
                'rejected' => 'rejeté'
            ];

            $message = 'Votre compte est ' . ($statusMessages[$user->status] ?? $user->status);
            
            return response()->json([
                'status' => 'error',
                'message' => $message,
                'user_status' => $user->status,
                'required_status' => $status
            ], 403);
        }

        return $next($request);
    }
}
