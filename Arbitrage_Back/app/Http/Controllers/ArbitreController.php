<?php

namespace App\Http\Controllers;

use App\Models\Arbitre;
use Illuminate\Http\Request;

class ArbitreController extends Controller
{
    public function index()
    {
        $arbitres = Arbitre::with('ville')->get();
        return $arbitres;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'type' => 'required|in:centre,assistant',
            'user_id' => 'required|integer'
        ]);

        // Vérifier si l'arbitre existe déjà
        $existingArbitre = Arbitre::where('nom', strtoupper($request->nom))
            ->where('prenom', strtoupper($request->prenom))
            ->where('user_id', $request->user_id)
            ->first();

        if ($existingArbitre) {
            return response()->json([
                'message' => 'Cet arbitre existe déjà'
            ], 409);
        }

        $arbitre = Arbitre::create([
            'nom' => strtoupper($request->nom),
            'prenom' => strtoupper($request->prenom),
            'type' => $request->type,
            'user_id' => $request->user_id
        ]);

        return response()->json($arbitre, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $arbitre = Arbitre::find($id);
        $arbitre->update($request->all());
        return [
            "status" => true,
            "data" => $arbitre
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $arbitre = Arbitre::find($id);
        $arbitre->delete();
    }
}
