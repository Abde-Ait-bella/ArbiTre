<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Ville;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;

class VilleController extends Controller
{
    public function index()
    {
        $villes = Ville::all();
        return $villes;
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $ville = new Ville;

        $ville->nom = $request->nom;
        $ville->user_id = $request->user_id;
        $ville->save();

        return [
            "status" => true,
            "data" => $ville,
            // '$request->user_id' => $request->user_id,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ville = Ville::find($id);
        $ville->update($request->all());
        return [
            "status" => true,
            "data" => $ville
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ville = Ville::find($id);
        $ville->delete();
    }
}
