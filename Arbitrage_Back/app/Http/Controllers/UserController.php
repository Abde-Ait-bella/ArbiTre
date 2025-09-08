<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Récupérer tous les utilisateurs
     */
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        
        if ($request->get('paginated', false)) {
            $users = User::paginate($perPage);
        } else {
            $users = User::all();
        }
        
        return response()->json([
            'status' => 'success',
            'data' => $users,
            'count' => $users instanceof \Illuminate\Pagination\LengthAwarePaginator 
                      ? $users->total() 
                      : $users->count(),
        ]);
    }

    /**
     * Créer un nouvel utilisateur
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Utilisateur créé avec succès',
            'data' => $user,
        ], 201);
    }

    /**
     * Afficher un utilisateur spécifique
     */
    public function show(string $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $user,
        ]);
    }

    /**
     * Mettre à jour un utilisateur
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        $updateData = $request->only(['name', 'email']);
        if ($request->has('password')) {
            $updateData['password'] = bcrypt($request->password);
        }

        $user->update($updateData);

        return response()->json([
            'status' => 'success',
            'message' => 'Utilisateur mis à jour avec succès',
            'data' => $user,
        ]);
    }

    /**
     * Supprimer un utilisateur
     */
    public function destroy(string $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Utilisateur supprimé avec succès',
        ]);
    }
}
