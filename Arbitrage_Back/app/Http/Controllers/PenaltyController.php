<?php

namespace App\Http\Controllers;

use App\Models\Penalty;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PenaltyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penalties = Penalty::all();
        return $penalties;
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
        $user = Auth::user()->id;
        $penalties = $request->all();
        foreach ($penalties as $penalty) {
            Penalty::create($penalty);
        }

        return response()->json(
            [
                "status" => true,
                "data" => $penalties,
                "user" => $user,
            ]
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Penalty $penalty)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Penalty $penalty)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = Auth::user()->id;
        $updatePenalties = $request->all();
        $ids = collect($updatePenalties)->pluck('id')->filter();

        $penal = Penalty::where('matche_id', $id);

        if ($ids) {
            $penal->whereNotIn('id', $ids)->delete();
        }

        foreach ($updatePenalties as $updatePenalty) {

            if (isset($updatePenalty['id'])) {
                $Penalty = Penalty::find($updatePenalty['id']);
                if ($Penalty) {
                    $Penalty->update($updatePenalty);
                } else {
                    Penalty::create($updatePenalty);
                }
            } else {
                Penalty::create($updatePenalty);
            }

        }


        return response()->json(
                [
                    "status" => true,
                    "data" => $updatePenalties,
                    "user" => $user,
                ]
            );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Penalty $penalty)
    {
        //
    }
}
