<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Changement;
use App\Models\Joueur;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ChangementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $changements = Changement::all();
        return $changements;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user()->id;
        $changements = $request->all();

        foreach ($changements as $changement) {
            Changement::create($changement);

            // Joueur entrant (par nom, licence null)
            if (isset($changement['joueur_nom_entr']) && is_string($changement['joueur_nom_entr'])) {
                $joueurEntrant = Joueur::where('nom', $changement['joueur_nom_entr'])->first();
                if (!$joueurEntrant) {
                    $j = new Joueur();
                    $j->nom = $changement['joueur_nom_entr'];
                    $j->joueur_numero_licence = null;
                    $j->joueur_numero = $changement['joueur_num_entr'] ?? null;
                    $j->user_id = $user;
                    $j->save();
                }
            }
            // Joueur sortant (par nom, licence null)
            if (isset($changement['joueur_nom_sort']) && is_string($changement['joueur_nom_sort'])) {
                $joueurSortant = Joueur::where('nom', $changement['joueur_nom_sort'])->first();
                if (!$joueurSortant) {
                    $j = new Joueur();
                    $j->nom = $changement['joueur_nom_sort'];
                    $j->joueur_numero_licence = null;
                    $j->joueur_numero = $changement['joueur_num_sort'] ?? null;
                    $j->user_id = $user;
                    $j->save();
                }
            }
        }

        return [
            "status" => true,
            "data" => $changements,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user()->id;
        $updatedChangements = $request->all();
        $ids = collect($updatedChangements)->pluck('id')->filter();

        $changements = Changement::where('matche_id', $id);

        if ($ids) {
            $changements->whereNotIn('id', $ids)->delete();
        }

        foreach ($updatedChangements as $updatedChangement) {
            if (isset($updatedChangement['id'])) {
                $changement = Changement::find($updatedChangement['id']);
                if ($changement) {
                    $changement->update($updatedChangement);
                } else {
                    Changement::create($updatedChangement);
                }
            } else {
                Changement::create($updatedChangement);
            }

            // Joueur entrant (par nom, licence null)
            if (isset($updatedChangement['joueur_nom_entr']) && is_string($updatedChangement['joueur_nom_entr'])) {
                $joueurEntrant = Joueur::where('nom', $updatedChangement['joueur_nom_entr'])->first();
                if (!$joueurEntrant) {
                    $j = new Joueur();
                    $j->nom = $updatedChangement['joueur_nom_entr'];
                    $j->joueur_numero_licence = null;
                    $j->joueur_numero = $updatedChangement['joueur_num_entr'] ?? null;
                    $j->user_id = $user;
                    $j->save();
                }
            }
            // Joueur sortant (par nom, licence null)
            if (isset($updatedChangement['joueur_nom_sort']) && is_string($updatedChangement['joueur_nom_sort'])) {
                $joueurSortant = Joueur::where('nom', $updatedChangement['joueur_nom_sort'])->first();
                if (!$joueurSortant) {
                    $j = new Joueur();
                    $j->nom = $updatedChangement['joueur_nom_sort'];
                    $j->joueur_numero_licence = null;
                    $j->joueur_numero = $updatedChangement['joueur_num_sort'] ;
                    $j->user_id = $user;
                    $j->save();
                }
            }
        }

        return [
            "status" => true,
            "data" => $updatedChangements
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $changement = Changement::find($id);
        $changement->delete();
        return [
            "status" => true
        ];
    }
}
