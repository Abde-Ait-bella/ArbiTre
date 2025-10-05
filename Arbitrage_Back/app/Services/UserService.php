<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class UserService
{
    /**
     * Récupérer tous les utilisateurs avec pagination optionnelle
     */
    public function getAllUsers(Request $request)
    {
        $perPage = $request->get('per_page', 15);
        
        if ($request->get('paginated', false)) {
            $users = User::paginate($perPage);
        } else {
            $users = User::all();
        }
        
        return [
            'users' => $users,
            'count' => $users instanceof \Illuminate\Pagination\LengthAwarePaginator 
                      ? $users->total() 
                      : $users->count(),
        ];
    }

    /**
     * Récupérer les utilisateurs actifs (status: accepted)
     */
    public function getActiveUsers()
    {
        return User::where('status', 'accepted')->get();
    }

    /**
     * Récupérer les utilisateurs inactifs (status différent de accepted ou null)
     */
    public function getInactiveUsers()
    {
        return User::where(function($query) {
            $query->where('status', '!=', 'accepted')
                  ->orWhereNull('status');
        })->get();
    }

    /**
     * Créer un nouvel utilisateur
     */
    public function createUser(array $userData)
    {
        return User::create([
            'name' => $userData['name'],
            'email' => $userData['email'],
            'password' => bcrypt($userData['password']),
        ]);
    }

    /**
     * Trouver un utilisateur par son ID
     */
    public function findUserById(string $id)
    {
        return User::find($id);
    }

    /**
     * Mettre à jour les données d'un utilisateur
     */
    public function updateUser(User $user, array $userData)
    {
        $updateData = array_filter($userData, function ($key) {
            return in_array($key, ['name', 'email']);
        }, ARRAY_FILTER_USE_KEY);
        
        if (isset($userData['password'])) {
            $updateData['password'] = bcrypt($userData['password']);
        }

        $user->update($updateData);
        
        return $user;
    }

    /**
     * Mettre à jour le statut d'un utilisateur
     */
    public function updateUserStatus(User $user, string $status)
    {
        if (!in_array($status, ['accepted', 'pending', 'rejected'])) {
            throw new \InvalidArgumentException('Statut invalide');
        }

        $user->status = $status;
        $user->save();
        
        return $user;
    }

    /**
     * Mettre à jour le rôle d'un utilisateur
     */
    public function updateUserRole(User $user, string $role)
    {
        if (!in_array($role, ['user', 'super_admin'])) {
            throw new \InvalidArgumentException('Rôle invalide');
        }

        $user->role = $role;
        $user->save();
        
        return $user;
    }

    /**
     * Mettre à jour le statut de plusieurs utilisateurs en masse
     */
    public function bulkUpdateStatus(array $userIds, string $status)
    {
        if (!in_array($status, ['accepted', 'pending', 'rejected'])) {
            throw new \InvalidArgumentException('Statut invalide');
        }

        $users = User::whereIn('id', $userIds)->get();
        
        foreach ($users as $user) {
            $user->status = $status;
            $user->save();
        }
        
        return $users;
    }

    /**
     * Supprimer un utilisateur
     */
    public function deleteUser(User $user)
    {
        return $user->delete();
    }
}
