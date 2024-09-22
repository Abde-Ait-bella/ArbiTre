<?php

namespace App\Http\Controllers;

use App\Models\Matche;
use App\Http\Controllers\Controller;
use App\Models\Avertissement;
use App\Models\But;
use App\Models\Changement;
use App\Models\Penalty;
use Illuminate\Http\Request;

class matcheController extends Controller
{

    public function index()
    {
        $matche = Matche::with(['stade.ville', 'ville', 'delegue.ville', 'competition', 'saison'])->get();
        return $matche;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $matche = matche::create($request->all());

        return [
            "status" => true,
            "data" => $matche
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $matche = Matche::find($id);
        $matche->update($request->all());
        return [
            "status" => true,
            "data" => $matche
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $matche = Matche::find($id);
        $matche->delete();

        $penalty = Penalty::where('matche_id', $id);
        $penalty->delete();

        $avert = Avertissement::where('matche_id', $id);
        $avert->delete();

        $but = But::where('matche_id', $id);
        $but->delete();

        $changement = Changement::where('matche_id', $id);
        $changement->delete();
    }

}
