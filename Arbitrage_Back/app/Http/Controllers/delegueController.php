<?php

namespace App\Http\Controllers;

use App\Models\Delegue;
use Illuminate\Http\Request;

class DelegueController extends Controller
{
    public function index()
    {
        $delegue = Delegue::with('Ville')->get();
        return $delegue;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'user_id' => 'required|integer'
        ]);

        // Vérifier si le délégué existe déjà
        $existingDelegue = Delegue::where('nom', strtoupper($request->nom))
            ->where('prenom', strtoupper($request->prenom))
            ->where('user_id', $request->user_id)
            ->first();

        if ($existingDelegue) {
            return response()->json([
                'message' => 'Ce délégué existe déjà'
            ], 409);
        }

        $delegue = Delegue::create([
            'nom' => strtoupper($request->nom),
            'prenom' => strtoupper($request->prenom),
            'user_id' => $request->user_id
        ]);

        return response()->json($delegue, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $delegue = Delegue::find($id);
        $delegue->update($request->all());
        return [
            "status" => true,
            "data" => $delegue
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delegue = Delegue::find($id);
        $delegue->delete();
    }
}
