<?php

namespace App\Libraries;

use TCPDF;

class CustomTcpdf extends TCPDF
{
    // Set a custom header for every page
    public function Header()
    {
        // Set Arabic font for header (Amiri if available, fallback to dejavusans)
        $fontPath = public_path('fonts/tcpdf/Amiri-Regular.ttf');
        if (file_exists($fontPath)) {
            $fontname = \TCPDF_FONTS::addTTFfont($fontPath, 'TrueTypeUnicode', '', 96);
            $this->SetFont($fontname, '', 18);
        } else {
            $this->SetFont('dejavusans', '', 18);
        }
        $this->setRTL(true);
        // --- Custom header as HTML ---
        $html = '
        <table dir="rtl" style="width: 100%; border: none; padding-bottom: 20px; font-family: Amiri, dejavusans, sans-serif;">
            <tr>
                <td style="width: 20%; margin-top: 10px; text-align: center; border: none; font-family: Amiri, dejavusans, sans-serif;">
                        <table style="width:100%; border:none;">
            <tr>
                <td style="border:none; height: 20px;"></td>
            </tr>
        </table>
                    <img src="' . public_path('images/frmf.png') . '" alt="FRMF" style="height: 100px; width: auto;">
                </td>
                <td style="width: 30%; text-align: center; margin-top: -10px; border: none; font-family: Amiri, dejavusans, sans-serif;">
                    <p style="margin: 0; font-size: 20px; font-weight: bold; line-height: 15px; font-family: Amiri, dejavusans, sans-serif;">الجامعة الملكية المغربية لكرة القدم</p>
                    <p style="margin: 0; font-size: 16px; font-family: Amiri, dejavusans, sans-serif;">العصبة الجهوية سوس ماسة لكرة القدم</p>
                    <p style="margin: 0; font-size: 14px; font-family: Amiri, dejavusans, sans-serif;">اللجنة الجهوية للتحكيم - المديرية الجهوية للحكام</p>
                </td>
                <td style="width: 30%; text-align: center; margin-top: -10px; border: none; font-family: Amiri, dejavusans, sans-serif;">
                    <p style="margin: 0; font-size: 20px; font-weight: bold; line-height: 15px; font-family: Amiri, dejavusans, sans-serif;">Fédération royale marocaine de football</p>
                    <p style="margin: 0; font-size: 16px; font-family: Amiri, dejavusans, sans-serif;">Ligue Régionale de Souss Massa de football</p>
                    <p style="margin: 0; font-size: 14px; font-family: Amiri, dejavusans, sans-serif;">Comité Régional d\'Arbitrage - Direction Régionale de l\'Arbitrage</p>
                </td>
                <td style="width: 20%; margin-top: 10px; text-align: center; border: none; font-family: Amiri, dejavusans, sans-serif;">
                        <table style="width:100%; border:none;">
            <tr>
                <td style="border:none; height: 20px;"></td>
            </tr>
        </table>
                    <img src="' . public_path('images/ligue_souss.png') . '" alt="Ligue Souss" style="height: 100px; width: auto;">
                </td>
            </tr>
        </table>';
        $this->writeHTMLCell(0, 0, 0, 0, $html, 0, 1, 0, true, 'C', true);
        $this->Ln(2);
    }
}
