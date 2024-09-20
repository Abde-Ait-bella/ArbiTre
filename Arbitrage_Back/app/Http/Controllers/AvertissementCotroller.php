<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Avertissement;
use App\Models\Joueur;
use App\Models\Matche;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\matches;

class AvertissementCotroller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $avertissement = Avertissement::with('matche')->get();
        return $avertissement;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user()->id;
        $avertissement = $request->all();
        foreach ($avertissement as $avert) {
            Avertissement::create($avert);
            $joueur = Joueur::where('joueur_numero_licence', $avert['joueur_numero_licence'])->get()->all();
            if (!$joueur) {
                $j = new Joueur();
                $j->nom = $avert['nom'];
                $j->joueur_numero_licence = $avert['joueur_numero_licence'];
                $j->joueur_numero = $avert['joueur_numero'];
                $j->user_id = $user;
                $j->save();
            }
        }

        return response()->json(
            [
                "status" => true,
                "data" => $avertissement,
                "user" => $user,
                // "request" => $requestJoueur
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user()->id;
        $updatedAvertissements = $request->all();
        $ids = collect($updatedAvertissements)->pluck('id')->filter();

        $avert = Avertissement::where('matche_id', $id);

        if ($ids) {
            $avert->whereNotIn('id', $ids)->delete();
        }

        foreach ($updatedAvertissements as $updatedAvertissement) {


            if (isset($updatedAvertissement['id'])) {
                $avertissement = Avertissement::find($updatedAvertissement['id']);
                if ($avertissement) {
                    $avertissement->update($updatedAvertissement);
                } else {
                    Avertissement::create($updatedAvertissement);
                }
            } else {
                Avertissement::create($updatedAvertissement);
            }

            if (isset($updatedAvertissement['joueur_numero_licence'])) {
                $joueur = Joueur::where('joueur_numero_licence', $updatedAvertissement['joueur_numero_licence'])->first();
                if ($joueur) {
                    $joueur->nom = $updatedAvertissement['nom'];
                    $joueur->joueur_numero_licence = $updatedAvertissement['joueur_numero_licence'];
                    $joueur->joueur_numero = $updatedAvertissement['joueur_numero'];
                    $joueur->save();
                } else {
                    $j = new Joueur();
                    $j->nom = $updatedAvertissement['nom'];
                    $j->joueur_numero_licence = $updatedAvertissement['joueur_numero_licence'];
                    $j->joueur_numero = $updatedAvertissement['joueur_numero'];
                    $j->user_id = $user;
                    $j->save();
                }
            }
        }


        return response()->json(
                [
                    "status" => true,
                    "data" => $updatedAvertissements,
                    "user" => $user,
                    // "request" => $requestJoueur
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $avertissement = Avertissement::find($id);
        $avertissement->delete();
        return [
            "status" => true,
        ];
    }
}
