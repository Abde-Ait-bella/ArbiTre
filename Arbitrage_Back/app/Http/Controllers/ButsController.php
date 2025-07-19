<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\But;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ButsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buts = But::all();

        return $buts;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $buts = $request->all();

        foreach ($buts as $but) {
            But::create($but);
        }

        return [
            "status" => true,
            "data" => $buts,
        ];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $updatedButs = $request->all();
        $ids = collect($updatedButs)->pluck('id')->filter(); // Remove null values

        $buts = But::where('matche_id', $id);

        if ($ids) {
            $buts->whereNotIn('id', $ids)->delete();
        }

        foreach ($updatedButs as $updatedBut) {
            if (isset($updatedBut['id'])) {
                $But = But::find($updatedBut['id']);
                if ($But) {
                    $But->update($updatedBut);
                } else {
                    But::create($updatedBut);
                }
            } else {
                But::create($updatedBut);
            }
        }

        return [
            "status" => true,
            "data" => $updatedButs
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $but = But::find($id);
        $but->delete();
        return [
            "status" => true
        ];
    }
}
