<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Changement;
use App\Models\Joueur;
// use App\Models\joueur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChangementCotroller extends Controller
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

        $user_id = Auth::user()->id;
        $changements = $request->all();

        foreach ($changements as $chang) {
            Changement::create($chang);

            if (isset($chang['joueur_licence_entr'])) {
                $joueur_1 = Joueur::where('joueur_numero_licence', $chang['joueur_licence_entr'])->where('user_id', $user_id)->first();
                if ($joueur_1) {
                    $joueur_1->nom = $chang['joueur_nom_entr'];
                    $joueur_1->joueur_numero_licence = $chang['joueur_licence_entr'];
                    $joueur_1->joueur_numero = $chang['joueur_num_entr'];
                    $joueur_1->save();
                } elseif (!$joueur_1) {
                    $j = new Joueur();
                    $j->nom = $chang['joueur_nom_entr'];
                    $j->joueur_numero_licence = $chang['joueur_licence_entr'];
                    $j->joueur_numero = $chang['joueur_num_entr'];
                    $j->user_id = $user_id;
                    $j->save();
                }
            }
            if (isset($chang['joueur_licence_sort'])) {
                $joueur_2 = Joueur::where('joueur_numero_licence', $chang['joueur_licence_sort'])
                ->where('user_id', $user_id)->first();
                if ($joueur_2) {
                    $joueur_2->nom = $chang['joueur_nom_sort'];
                    $joueur_2->joueur_numero_licence = $chang['joueur_licence_sort'];
                    $joueur_2->joueur_numero = $chang['joueur_num_sort'];
                    $joueur_2->save();
                } elseif (!$joueur_2) {
                    $j = new Joueur();
                    $j->nom = $chang['joueur_nom_sort'];
                    $j->joueur_numero_licence = $chang['joueur_licence_sort'];
                    $j->joueur_numero = $chang['joueur_num_sort'];
                    $j->user_id = $user_id;
                    $j->save();
                }
            }
        }

        return [
            "satus" => true,
            "data" => $changements,
            'joueur1' => $joueur_1,
            'joueur2' => $joueur_2,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user_id = Auth::user()->id;
        $updatedChangements = $request->all();
        $ids = collect($updatedChangements)->pluck('id');

        $chang = Changement::where('matche_id', $id);

        if ($ids) {
            $chang->whereNotIn('id', $ids)->delete();
        }

        $changement = [];

        foreach ($updatedChangements as $updatedChangement) {
            if (isset($updatedChangement['id'])) {

                $changementModel = Changement::find($updatedChangement['id']);

                if ($changementModel) {
                    $changementModel->update($updatedChangement);
                } else {
                    Changement::create($updatedChangement);
                }

                $changement[] = $changementModel;
            } else {
                $createdChangement = Changement::create($updatedChangement);
                $changement[] = $createdChangement;
            }

            if (isset($updatedChangement['joueur_licence_entr'])) {
                $joueur_1 = Joueur::where('joueur_numero_licence', $updatedChangement['joueur_licence_entr'])
                ->where('user_id', $user_id)->first();
                if ($joueur_1) {
                    $joueur_1->nom = $updatedChangement['joueur_nom_entr'];
                    $joueur_1->joueur_numero_licence = $updatedChangement['joueur_licence_entr'];
                    $joueur_1->joueur_numero = $updatedChangement['joueur_num_entr'];
                    $joueur_1->save();
                } elseif (!$joueur_1) {
                    $j = new Joueur();
                    $j->nom = $updatedChangement['joueur_nom_entr'];
                    $j->joueur_numero_licence = $updatedChangement['joueur_licence_entr'];
                    $j->joueur_numero = $updatedChangement['joueur_num_entr'];
                    $j->user_id = $user_id;
                    $j->save();
                }
            }
            if (isset($updatedChangement['joueur_licence_sort'])) {
                $joueur_2 = Joueur::where('joueur_numero_licence', $updatedChangement['joueur_licence_sort'])->where('user_id', $user_id)->first();

                if ($joueur_2) {
                    $joueur_2->nom = $updatedChangement['joueur_nom_sort'];
                    $joueur_2->joueur_numero_licence = $updatedChangement['joueur_licence_sort'];
                    $joueur_2->joueur_numero = $updatedChangement['joueur_num_sort'];
                    $joueur_2->save();
                } elseif (!$joueur_2) {
                    $j = new Joueur();
                    $j->nom = $updatedChangement['joueur_nom_sort'];
                    $j->joueur_numero_licence = $updatedChangement['joueur_licence_sort'];
                    $j->joueur_numero = $updatedChangement['joueur_num_sort'];
                    $j->user_id = $user_id;
                    $j->save();
                }
            }
        }

        return [
            "status" => true,
            "data" => $changement,
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
