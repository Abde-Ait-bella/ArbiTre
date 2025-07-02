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
use PDF; // Using TCPDF facade
use App\Libraries\CustomTcpdf;

class ReportController extends Controller
{
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

        // Fetch match-related data
        $avertissements = Avertissement::all()->where('matche_id', $id);
        // return response()->json($avertissements);


        $changements = Changement::where('matche_id', $id)->get();
        $buts = But::where('matche_id', $id)->get();
        $penalties = Penalty::where('matche_id', $id)->get();

        // Process data as before
        $avertissementsG = $avertissements->where('type', 'G');
        $avertissementsR = $avertissements->where('type', 'R');
        $changementsClub1 = $changements->where('club_id', $rapport->club_id_1);
        $changementsClub2 = $changements->where('club_id', $rapport->club_id_2);
        $butsClub1 = $buts->where('club_id', $rapport->club_id_1);
        $butsClub2 = $buts->where('club_id', $rapport->club_id_2);

        // Calculate balancing values
        $restCH = $changementsClub1->count() - $changementsClub2->count();
        $restBUT = $butsClub1->count() - $butsClub2->count();
        $restCH1 = 0;
        $restCH2 = 0;
        $restBUT1 = 0;
        $restBUT2 = 0;


        if ($changementsClub1->count() > $changementsClub2->count()) {
            $restCH2 = abs($restCH);
        } elseif ($changementsClub1->count() < $changementsClub2->count()) {
            $restCH1 = abs($restCH);
        }

        if ($butsClub1->count() > $butsClub2->count()) {
            $restBUT2 = abs($restBUT);
        } elseif ($butsClub1->count() < $butsClub2->count()) {
            $restBUT1 = abs($restBUT);
        }

        $skipSignature = $butsClub1->count() >= 5 || $butsClub2->count() >= 5 || $changementsClub1->count() >= 5 || $changementsClub2->count() >= 5;
        $skipPinalties = $avertissements->count() >= 12;

        $b1 = $butsClub1->count();
        $b2 = $butsClub2->count();
        $c1 = $changementsClub1->count();
        $c2 = $changementsClub2->count();

        $skipButs = ($b1 + $c1 > 15) || ($b2 + $c2 > 15) || ($b1 + $c2 > 15) || ($b2 + $c1 > 15);

        // Prepare view data
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
            'skipSignature' => $skipSignature,
            'skipPinalties' => $skipPinalties,
            'skipButs' => $skipButs,
            'butsCount' => $buts->count(),
        ];

        // ===== ENHANCED TCPDF CONFIGURATION =====

        // Use custom TCPDF class for header
        $pdf = new CustomTcpdf('L', 'mm', 'LEGAL', true, 'UTF-8', false);
        $pdf->SetTitle('تقرير الحكم');
        $pdf->SetAuthor('ArbiTre System');
        $pdf->SetSubject('Match Report');
        $pdf->setRTL(true);
        $pdf->SetFontSubsetting(true);
        $pdf->setPrintHeader(true); // Enable custom header
        $pdf->setPrintFooter(false);
        $pdf->SetMargins(5, 0, 5);
        $pdf->SetAutoPageBreak(true, 10);

        $fontPath = public_path('fonts/tcpdf/Amiri-Regular.ttf');
        if (!file_exists($fontPath)) {
            dd("Fichier non trouvé : $fontPath");
        }
        $fontname = \TCPDF_FONTS::addTTFfont(
            $fontPath,
            'TrueTypeUnicode',
            '',
            96,
        );
        $pdf->SetFont($fontname, '', 12);
        $pdf->setCellHeightRatio(1.25);
        $pdf->setImageScale(1.53);
        $pdf->setJPEGQuality(100);
        $pdf->SetCellPadding(1);
        $pdf->AddPage('L', 'LEGAL');
        $data['fontname'] = $fontname;
        $html = view('Rapport.Rapport', $data)->render();
        $pdf->writeHTML($html, true, false, true, false, '');
        $filename = "match_report_{$rapport->id}_{$rapport->date_match}.pdf";
        // Output PDF as a Laravel response
        return response($pdf->Output($filename, 'S'))
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . $filename . '"');
    }
}