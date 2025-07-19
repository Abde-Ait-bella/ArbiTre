<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Changement;
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
        $changements = $request->all();

        foreach ($changements as $changement) {
            Changement::create($changement);
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
