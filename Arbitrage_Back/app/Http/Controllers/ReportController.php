<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Matche;
use App\Models\Arbitre;
use App\Models\Club;
use App\Models\Category;
use App\Models\Avertissement;
use App\Models\Changement;
use App\Models\But;
use App\Models\Ville;
use App\Models\Penalty;
use Barryvdh\Snappy\Facades\SnappyPdf;

class ReportController extends Controller
{

    /**
     * Generate team statistics report
     * 
     * @param int $clubId
     * @return \Illuminate\Http\Response
     */
    // public function teamReport($clubId)
    // {
    //     // Implementation for team report
    //     // Similar to match report but with different data and template
    // }

    /**
     * Generate player statistics report
     * 
     * @param int $playerId
     * @return \Illuminate\Http\Response
     */
    // public function playerReport($playerId)
    // {
    //     // Implementation for player report
    // }

    // /**
    //  * Generate competition summary report
    //  * 
    //  * @param int $competitionId
    //  * @return \Illuminate\Http\Response
    //  */
    // public function competitionReport($competitionId)
    // {
    //     // Implementation for competition report
    // }

    /**
     * Generate detailed PDF report for a match
     * 
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function generatePDF($id)
    {
        // Fetch match data
        $rapport = Matche::findOrFail($id);

        // Fetch all required reference data
        $arbitres = Arbitre::all();
        $clubs = Club::all();
        $categories = Category::all();
        $villes = Ville::all();

        // Fetch match-related data with safeguards
        $avertissements = Avertissement::where('matche_id', $id)->get();
        $changements = Changement::where('matche_id', $id)->get();
        $buts = But::where('matche_id', $id)->get();
        $penalties = Penalty::where('matche_id', $id)->get();

        // Process data - ensure collections are initialized
        $avertissementsG = $avertissements->where('type', 'G');
        $avertissementsR = $avertissements->where('type', 'R');

        $changementsClub1 = $changements->where('club_id', $rapport->club_id_1);
        $changementsClub2 = $changements->where('club_id', $rapport->club_id_2);

        $butsClub1 = $buts->where('club_id', $rapport->club_id_1);
        $butsClub2 = $buts->where('club_id', $rapport->club_id_2);

        // Calculate balancing for tables
        $restCH = $changementsClub1->count() - $changementsClub2->count();
        $restBUT = $butsClub1->count() - $butsClub2->count();

        $restCH1 = 0;
        $restCH2 = 0;

        if ($changementsClub1->count() > $changementsClub2->count()) {
            $restCH2 = abs($restCH);
        } elseif ($changementsClub1->count() < $changementsClub2->count()) {
            $restCH1 = abs($restCH);
        }

        $restBUT1 = 0;
        $restBUT2 = 0;

        if ($butsClub1->count() > $butsClub2->count()) {
            $restBUT2 = abs($restBUT);
        } elseif ($butsClub1->count() < $butsClub2->count()) {
            $restBUT1 = abs($restBUT);
        }

        // Explicitly define skipTable
        $skipTable = $butsClub1->count() >= 5 || $butsClub2->count() >= 5 || $changementsClub1->count() >= 5 || $changementsClub2->count() >= 5;

        // Create data array directly instead of using compact()
        $data = [
            'rapport' => $rapport,
            'arbitres' => $arbitres,
            'clubs' => $clubs,
            'categories' => $categories,
            'avertissementsG' => $avertissementsG,
            'avertissementsR' => $avertissementsR,
            'changementsClub1' => $changementsClub1,
            'changementsClub2' => $changementsClub2,
            'butsClub1' => $butsClub1,
            'butsClub2' => $butsClub2,
            'villes' => $villes,
            'penalties' => $penalties,
            'restCH1' => $restCH1,
            'restCH2' => $restCH2,
            'restBUT1' => $restBUT1,
            'restBUT2' => $restBUT2,
            'skipTable' => $skipTable  // Ensure skipTable is explicitly included
        ];

        // Load PDF with data array
        $pdf = SnappyPdf::loadView('rapport.detailed_pdf', $data);

        // Configure PDF options
        $pdf->setOption('encoding', 'UTF-8');
        $pdf->setOption('margin-top', 10);
        $pdf->setOption('margin-right', 10);
        $pdf->setOption('margin-bottom', 10);
        $pdf->setOption('margin-left', 10);
        $pdf->setOption('page-size', 'Legal');
        $pdf->setOption('orientation', 'Landscape');
        $pdf->setOption('enable-local-file-access', true);

        // return $pdf->inline('match_report_' . $id . '.pdf');
        return $pdf->inline("match_report_{$id}.pdf");


        // return $pdf->download('rapport-' . $rapport->id . '.pdf');
    }
}