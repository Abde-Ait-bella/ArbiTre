<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Récupérer tous les utilisateurs
     */
    public function index(Request $request)
    {
        $result = $this->userService->getAllUsers($request);
        
        return response()->json([
            'status' => 'success',
            'data' => $result['users'],
            'count' => $result['count'],
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

        $user = $this->userService->createUser($request->only(['name', 'email', 'password']));

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
        $user = $this->userService->findUserById($id);
        
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
        $user = $this->userService->findUserById($id);
        
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

        $user = $this->userService->updateUser($user, $request->only(['name', 'email', 'password']));

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
        $user = $this->userService->findUserById($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        $this->userService->deleteUser($user);

        return response()->json([
            'status' => 'success',
            'message' => 'Utilisateur supprimé avec succès',
        ]);
    }

    /**
     * Mettre à jour le statut d'un utilisateur
     */
    public function updateStatus(Request $request, string $id, string $status)
    {
        $user = $this->userService->findUserById($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        try {
            $user = $this->userService->updateUserStatus($user, $status);
            
            $statusMessages = [
                'accepted' => 'activé',
                'pending' => 'mis en attente',
                'rejected' => 'rejeté'
            ];

            return response()->json([
                'status' => 'success',
                'message' => 'Utilisateur ' . $statusMessages[$status] . ' avec succès',
                'data' => $user,
            ]);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Activer un utilisateur (statut accepted)
     */
    public function activate(string $id)
    {
        return $this->updateStatus(request(), $id, 'accepted');
    }

    /**
     * Mettre un utilisateur en attente (statut pending)
     */
    public function pending(string $id)
    {
        return $this->updateStatus(request(), $id, 'pending');
    }

    /**
     * Rejeter un utilisateur (statut rejected)
     */
    public function reject(string $id)
    {
        return $this->updateStatus(request(), $id, 'rejected');
    }

    /**
     * Mettre à jour le rôle d'un utilisateur
     */
    public function updateRole(Request $request, string $id)
    {
        $user = $this->userService->findUserById($id);
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non trouvé',
            ], 404);
        }

        $request->validate([
            'role' => 'required|in:user,super_admin',
        ]);

        try {
            $user = $this->userService->updateUserRole($user, $request->role);
            
            return response()->json([
                'status' => 'success',
                'message' => 'Rôle utilisateur mis à jour avec succès',
                'data' => $user,
            ]);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Récupérer les utilisateurs actifs (status: accepted)
     */
    public function getActiveUsers()
    {
        $users = $this->userService->getActiveUsers();
        
        return response()->json([
            'status' => 'success',
            'data' => $users,
        ]);
    }

    /**
     * Récupérer les utilisateurs inactifs (status différent de accepted ou null)
     */
    public function getInactiveUsers()
    {
        $users = $this->userService->getInactiveUsers();
        
        return response()->json([
            'status' => 'success',
            'data' => $users,
        ]);
    }

    /**
     * Mettre à jour le statut de plusieurs utilisateurs en masse
     */
    public function bulkUpdateStatus(Request $request)
    {
        $request->validate([
            'userIds' => 'required|array',
            'userIds.*' => 'required|exists:users,id',
            'status' => 'required|in:accepted,pending,rejected',
        ]);

        try {
            $users = $this->userService->bulkUpdateStatus($request->userIds, $request->status);
            
            $statusMessages = [
                'accepted' => 'activés',
                'pending' => 'mis en attente',
                'rejected' => 'rejetés'
            ];

            return response()->json([
                'status' => 'success',
                'message' => count($request->userIds) . ' utilisateurs ' . $statusMessages[$request->status] . ' avec succès',
                'data' => $users,
            ]);
        } catch (\InvalidArgumentException $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
