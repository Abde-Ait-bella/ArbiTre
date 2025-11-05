<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Joueur;
use Illuminate\Http\Request;

class JoueurController extends Controller
{
    public function index()
    {
        $joueurs = Joueur::all();
        return $joueurs;
    }
        /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $Joueur = Joueur::create($request->all());
        
        return [
            "status" => true,
            "data" => $Joueur,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $Joueur = Joueur::find($id);
        $Joueur->update($request->all());
        return [
            "status" => true,
            "data" => $Joueur
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $Joueur = Joueur::find($id);
        $Joueur->delete();
    }
}
