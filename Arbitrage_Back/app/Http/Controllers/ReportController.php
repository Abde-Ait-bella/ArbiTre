<?php

namespace App\Http\Controllers;

use App\Models\Matche;
use Illuminate\Http\Request;
use Mpdf\Config\ConfigVariables;
use Mpdf\Config\FontVariables;
use Mpdf\Mpdf;
use PDF;

class ReportController extends Controller
{
    /**
     * Generate match report PDF
     * 
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function matchReport($id)
    {
        // Vérification des fichiers de police
        $fontDir = public_path('fonts');
        $fontFiles = [
            'Amiri-Regular.ttf',
            'Amiri-Bold.ttf',
            'Amiri-Italic.ttf',
            'Amiri-BoldItalic.ttf'
        ];
        
        // Vérifier si tous les fichiers existent
        $missingFiles = [];
        foreach ($fontFiles as $file) {
            $path = $fontDir . '/' . $file;
            if (!file_exists($path)) {
                $missingFiles[] = $file;
            }
        }
        
        // Si des fichiers sont manquants, afficher un message d'erreur
        if (!empty($missingFiles)) {
            return response()->json([
                'error' => 'Les fichiers de police suivants sont manquants: ' . implode(', ', $missingFiles),
                'directory' => $fontDir
            ], 500);
        }
        
        // Continuer avec le code existant...
        $match = Matche::with([
            'competition',
            'delegue',
            'arbitre',
            'arbitreAssistant1',
            'arbitreAssistant2',
            'quatriemeArbitre',
            'equipeA',
            'equipeB',
            'stade',
            'buts',
            'changements',
            'avertissements',
            'penalties'
        ])->findOrFail($id);
        
        // Créer mPDF avec le chemin vérifié
        $mpdf = new Mpdf([
            'mode' => 'utf-8',
            'format' => 'A4',
            'default_font' => 'amiri',
            'margin_left' => 10,
            'margin_right' => 10,
            'margin_top' => 15,
            'margin_bottom' => 20,
            'margin_header' => 10,
            'margin_footer' => 10,
            'fontDir' => [$fontDir],
            'fontdata' => [
                'amiri' => [
                    'R' => 'Amiri-Regular.ttf',
                    'B' => 'Amiri-Bold.ttf',
                    'I' => 'Amiri-Italic.ttf',
                    'BI' => 'Amiri-BoldItalic.ttf',
                ]
            ],
        ]);

        $mpdf->SetDirectionality('rtl'); // Set RTL for Arabic text

        // Generate HTML content for the PDF
        $html = view('reports.match', compact('match'))->render();

        $mpdf->WriteHTML($html);

        // Output PDF as download
        return response($mpdf->Output('match_report_' . $id . '.pdf', \Mpdf\Output\Destination::STRING_RETURN), 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="match_report_' . $id . '.pdf"',
        ]);
    }

    /**
     * Generate team statistics report
     * 
     * @param int $clubId
     * @return \Illuminate\Http\Response
     */
    public function teamReport($clubId)
    {
        // Implementation for team report
        // Similar to match report but with different data and template
    }

    /**
     * Generate player statistics report
     * 
     * @param int $playerId
     * @return \Illuminate\Http\Response
     */
    public function playerReport($playerId)
    {
        // Implementation for player report
    }

    /**
     * Generate competition summary report
     * 
     * @param int $competitionId
     * @return \Illuminate\Http\Response
     */
    public function competitionReport($competitionId)
    {
        // Implementation for competition report
    }
}