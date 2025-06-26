<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>تقرير الحكم</title>
    
    <style>

            /* @font-face {
            font-family: 'Noto Naskh Arabic';
            src: url('{{ public_path('storage/fonts/NotoNaskhArabic-Regular.ttf') }}') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        
        @font-face {
            font-family: 'Inria Sans';
            src: url('{{ public_path('storage/fonts/InriaSans-Regular.ttf') }}') format('truetype');
            font-weight: normal;
            font-style: normal;
        } */
        /* Base Styles */
        body {
            font-family: 'Noto Naskh Arabic', serif;
            color: #000;
            background-color: #fff;
            margin: 0;
            padding: 15px;
        }
        
        .detailleRapport {
            padding: 25px;
            font-family: 'Noto Naskh Arabic', serif;
            color: #000;
        }
        
        /* Header with logos and title */
        .images {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            color: #000;
        }
        
        .images div:nth-of-type(1) {
            margin-left: 10px;
            margin-right: 20px;
        }
        
        .images div:nth-of-type(2) {
            margin-right: 10px;
            margin-left: 20px;
            font-family: "Inria Sans", sans-serif;
        }
        
        .images p {
            margin: 0;
        }
        
        .images p:nth-child(1) {
            font-size: larger;
            line-height: 19px;
        }
        
        .images p:nth-child(2) {
            font-size: 17px;
        }
        
        .images p:nth-child(3) {
            font-size: 11px;
        }
        
        .images img {
            height: 80px;
        }
        
        /* Report title */
        .rapport-title {
            background-color: rgba(50%, 50%, 50%, 0.5);
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            padding: 5px;
            font-size: 3rem;
        }
        
        .rapport-title h3 {
            margin: 0;
            font-family: 'Noto Naskh Arabic', serif;
            font-size: 18px;
        }
        
        /* Tables styling */
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
            margin-bottom: 15px;
            color: #000;
        }
        
        table, th, td {
            border: 1px solid #000;
        }
        
        th, td {
            padding: 4px;
            text-align: center;
        }
        
        .th {
            background-color: rgba(50%, 50%, 50%, 0.5);
            text-align: center;
        }
        
        /* Two-column layout */
        .row {
            width: 100%;
            display: table;
            clear: both;
            margin-bottom: 15px;
        }
        
        .col-6 {
            width: 48%;
            float: right;
            padding: 0 1%;
        }
        
        /* Split tables layout */
        .sub-table-1 {
            width: 50%;
        }
        
        .sub-table-1 .th-border {
            border-left-color: rgb(203 203 203 / 50%);
        }
        
        .sub-table-2 {
            width: 50%;
        }
        
        .sub-table-2 .th-border {
            border-right-color: rgb(203 203 203 / 50%);
            color: rgb(229 229 229 / 50%);
        }
        
        /* Tables container for side-by-side tables */
        .tables-container {
            display: table;
            width: 100%;
            border-collapse: separate;
            border-spacing: 1%;
            margin-bottom: 15px;
        }
        
        .table-half {
            display: table-cell;
            width: 49%;
            vertical-align: top;
        }
        
        /* Notes section */
        .expl-content02 {
            display: flex;
            margin-bottom: 15px;
        }
        
        .expl-content02 p {
            font-size: 12px;
            padding: 5px 15px;
            background-color: rgba(50%, 50%, 50%, 0.5);
            border-radius: 14px;
        }
        
        /* Report content area */
        .ligne {
            /* border-bottom: 1.5px solid gray; */
            width: 100%;
            margin-bottom: 30px;
            min-height: 10px;
        }
        
        /* Signature area */
        .signature {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            margin-bottom: 10px;
        }
        
        /* Page break */
        .page-break {
            page-break-before: always;
        }
        
        /* Empty cells styling */
        .empty-cell {
            color: #999;
        }
        
        /* Team headers styling */
        .team-header {
            font-weight: bold;
            background-color: rgba(240, 240, 255, 0.3);
        }
        
        /* Main content containers */
        .container {
            width: 100%;
        }
        
        .contentP {
            margin-bottom: 10px;
        }
        
        /* Specific table layout overrides */
        .table-bordered {
            border: 1px solid #000;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-dark {
            color: #000;
        }
        
        /* Additional spacing helpers */
        .px-0 { padding-left: 0; padding-right: 0; }
        .px-1 { padding-left: 2px; padding-right: 2px; }
        .px-2 { padding-left: 4px; padding-right: 4px; }
        .px-3 { padding-left: 6px; padding-right: 6px; }
        
        .py-0 { padding-top: 0; padding-bottom: 0; }
        .py-1 { padding-top: 2px; padding-bottom: 2px; }
        
        .p-0 { padding: 0; }
        .p-1 { padding: 2px; }
        
        /* Remove any media queries since they don't apply to PDF */
    </style>
</head>
<body>
    
    <div class="container">
        <table class="images row print-header" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; border: none;">
            <tr style="border: none;">
                <td style="width: 20%; text-align: center; vertical-align: middle; border: none;">
                    <img 
                        class="logoLigue" 
                        src="{{ public_path('images/frmf.png') }}" 
                        alt="ligue souss" 
                        style="height: 100px; width: auto;"
                    />
                </td>
                <td style="width: 30%; text-align: center; vertical-align: middle; border: none;">
                    <div class="mb-0 text-center">
                        <p style="margin: 0; font-size: 20px; font-weight: bold;">الجامعة الملكية المغربية لكرة القدم</p>
                        <p style="margin: 0; font-size: 16px;">العصبة الجهوية سوس ماسة لكرة القدم</p>
                        <p style="margin: 0; font-size: 14px;">اللجنة الجهوية للتحكيم - المديرية الجهوية للحكام</p>
                    </div>
                </td>
                <td style="width: 30%; text-align: center; vertical-align: middle; border: none;">
                    <div class="mb-0 text-center">
                        <p style="margin: 0; font-size: 20px; font-weight: bold;">Fédération royale marocaine de football</p>
                        <p style="margin: 0; font-size: 16px;">Ligue Régionale de Souss Massa de football</p>
                        <p style="margin: 0; font-size: 14px;">Comité Régional d'Arbitrage - Direction Régionale de l'Arbitrage</p>
                    </div>
                </td>
                <td style="width: 20%; text-align: center; vertical-align: middle; border: none;">
                    <img 
                        class="titleLigue" 
                        src="{{ public_path('images/ligue_souss.png') }}" 
                        alt="ligue souss" 
                        style="height: 100px; width: auto;"
                    />
                </td>
            </tr>
        </table>
        
        <!-- Report Title -->
        <div class="text-center rapport-title">
            <h3 style="font-family: 'Noto Naskh Arabic', serif;
            font-size: 2rem; color: #fff">تقريـــــــر الحكـــــم</h3>
        </div>
        
        <!-- Main Report Content -->
        <div class="container contentP">
            <!-- Match Info Table -->
            <table class="table table-bordered text-dark">
                <tr>
                    <th class="p-0 px-3 th">المنافسة/الفئة : </th>
                    <th class="p-0 px-2">{{ $rapport->competition->nom ?? '-' }}</th>
                    <th class="p-0 px-2">
                        @foreach($categories as $category)
                            @if($category->id == $rapport->categorie_id)
                                {{ $category->nom }}
                            @endif
                        @endforeach
                    </th>
                    <th class="p-0 px-3 th">الساعة</th>
                    <th class="p-1 px-3">{{ $rapport->temps }}</th>
                    <th class="p-0 px-2 th">حكم الساحة</th>
                    <th class="p-0 px-2">
                        @foreach($arbitres as $arbitre)
                            @if($arbitre->id == $rapport->arbitre_c_id)
                                {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                            @endif
                        @endforeach
                    </th>
                    <th class="p-0 px-3 th">المدينة</th>
                    <th class="p-1 px-3">
                        @foreach($villes as $ville)
                            @if($ville->id == $rapport->centre_ville)
                                {{ $ville->nom }}
                            @endif
                        @endforeach
                    </th>
                </tr>
                <tr>
                    <th class="p-0 px-3 th">المباراة</th>
                    <th class="p-0 px-2" colspan="2">
                        @foreach($clubs as $club)
                            @if($club->id == $rapport->club_id_1)
                                {{ $club->abbr }}
                            @endif
                        @endforeach
                        #
                        @foreach($clubs as $club)
                            @if($club->id == $rapport->club_id_2)
                                {{ $club->abbr }}
                            @endif
                        @endforeach
                    </th>
                    <th class="p-0 px-2 th">الملعب</th>
                    <th class="p-0 px-2">{{ $rapport->stade->nom }}</th>
                    <th class="p-0 px-2 th">الحكم المساعد 1</th>
                    <th class="p-0 px-2">
                        @foreach($arbitres as $arbitre)
                            @if($arbitre->id == $rapport->arbitre_a1_id)
                                {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                            @endif
                        @endforeach
                    </th>
                    <th class="p-0 px-2 th">المدينة</th>
                    <th class="p-0 px-2">
                        @foreach($villes as $ville)
                            @if($ville->id == $rapport->assistant_1_ville)
                                {{ $ville->nom }}
                            @endif
                        @endforeach
                    </th>
                </tr>
                <tr>
                    <th class="p-0 px-2 th">النتيجة النهائية</th>
                    <th class="p-1 px-2" colspan="2">
                        {{ $rapport->result_club_1 ?? $rapport->but_club1 }} - {{ $rapport->result_club_2 ?? $rapport->but_club2 }}
                    </th>
                    <th class="p-0 px-2 th">المدينة</th>
                    <th class="p-0 px-2">{{ $rapport->ville->nom ?? '-' }}</th>
                    <th class="p-0 px-2 th">الحكم المساعد 2</th>
                    <th class="p-0 px-3">
                        @foreach($arbitres as $arbitre)
                            @if($arbitre->id == $rapport->arbitre_a2_id)
                                {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                            @endif
                        @endforeach
                    </th>
                    <th class="p-0 px-2 th">المدينة</th>
                    <th class="p-0 px-2">
                        @foreach($villes as $ville)
                            @if($ville->id == $rapport->assistant_2_ville)
                                {{ $ville->nom }}
                            @endif
                        @endforeach
                    </th>
                </tr>
                <tr>
                    <th class="p-0 px-2 th">التاريخ</th>
                    <th class="p-0 px-2" colspan="2">{{ $rapport->date }}</th>
                    <th class="p-0 px-2 th">المندوب</th>
                    <th class="p-0 px-2">
                        {{ $rapport->delegue->prenom ?? '-' }} {{ $rapport->delegue->nom ?? '-' }}
                    </th>
                    <th class="p-0 px-2 th">الحكم الرابع</th>
                    <th class="p-0 px-3">
                        @foreach($arbitres as $arbitre)
                            @if($arbitre->id == $rapport->arbitre_4_id)
                                {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                            @endif
                        @endforeach
                    </th>
                    <th class="p-0 px-2 th">المدينة</th>
                    <th class="p-0 px-2">
                        @foreach($villes as $ville)
                            @if($ville->id == $rapport->arbitre_4_ville)
                                {{ $ville->nom }}
                            @endif
                        @endforeach
                    </th>
                </tr>
            </table>
            
            <!-- Two-column layout for tables -->
            <div class="row">
                <!-- Right Side - Cards Tables -->
                <div class="col-6">
                    <!-- Yellow Cards Table -->
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th colspan="5" class="p-1 px-3 text-center text-dark th">الانذارات</th>
                            </tr>
                            <tr class="text-center">
                                <th class="p-1 px-3">الفريق</th>
                                <th class="p-1 px-3">إسم اللاعب</th>
                                <th class="p-1 px-3">الرخصة</th>
                                <th class="p-1 px-3">سبب الإنذار</th>
                                <th class="p-1 px-3">الدقيقة</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            @if(empty($avertissementsG) || count($avertissementsG) == 0)
                                <tr class="text-center">
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                </tr>
                            @else
                                @foreach($avertissementsG as $a)
                                    <tr>
                                        <td class="p-1 px-3">
                                            @foreach($clubs as $c)
                                                @if($c->id == $a->club_id)
                                                    {{ $c->abbr }}
                                                @endif
                                            @endforeach
                                        </td>
                                        <td class="p-1 px-3">{{ $a->nom }}</td>
                                        <td class="p-1 px-3">{{ $a->joueur_numero_licence }}</td>
                                        <td class="p-1 px-3">{{ $a->cause }}</td>
                                        <td class="p-1 px-3">{{ $a->minute }}</td>
                                    </tr>
                                @endforeach
                            @endif
                        </tbody>
                    </table>
                    
                    <!-- Red Cards Table -->
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th colspan="5" class="p-1 px-3 text-center text-dark th">الطرد</th>
                            </tr>
                            <tr class="text-center">
                                <th class="p-1 px-3">الفريق</th>
                                <th class="p-1 px-3">إسم اللاعب</th>
                                <th class="p-1 px-3">الرخصة</th>
                                <th class="p-1 px-3">سبب الطرد</th>
                                <th class="p-1 px-3">الدقيقة</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            @if(empty($avertissementsR) || count($avertissementsR) == 0)
                                <tr class="text-center">
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                    <td class="py-1 empty-cell">-</td>
                                </tr>
                            @else
                                @foreach($avertissementsR as $a)
                                    <tr>
                                        <td class="p-1 px-3">
                                            @foreach($clubs as $c)
                                                @if($c->id == $a->club_id)
                                                    {{ $c->abbr }}
                                                @endif
                                            @endforeach
                                        </td>
                                        <td class="p-1 px-3">{{ $a->nom }}</td>
                                        <td class="p-1 px-3">{{ $a->joueur_numero_licence }}</td>
                                        <td class="p-1 px-3">{{ $a->cause }}</td>
                                        <td class="p-1 px-3">{{ $a->minute }}</td>
                                    </tr>
                                @endforeach
                            @endif
                        </tbody>
                    </table>

                        <!-- Full-width Penalties section -->
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Penalty Kicks Tables - Full width -->
                            <div class="table-responsive">
                                <div class="col-md-12 me-0 row">
                                    <div class="p-0 col-6 sub-table-1">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th colspan="6" class="p-1 px-3 text-center th-border text-dark th">
                                                        ضربات الترجيح
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="p-1 px-0 text-center" colspan="6">
                                                        الفريق(أ) : 
                                                        @foreach($clubs as $c)
                                                            @if($c->id == $rapport->club_id_1)
                                                                {{ $c->abbr }}
                                                            @endif
                                                        @endforeach
                                                    </th>
                                                </tr>
                                                <tr class="text-center border-top-0">
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 1)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 2)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 3)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 4)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 5)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1" rowspan="2">مجموع الأهداف</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="text-center">
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 6)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 7)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 8)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 9)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 10)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1" rowspan="2">
                                                        @php 
                                                            $count = 0;
                                                            foreach($penalties as $p) {
                                                                if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->result == 1) {
                                                                    $count++;
                                                                }
                                                            }
                                                            if($count < 10) echo "0";
                                                            echo $count;
                                                        @endphp
                                                    </td>
                                                </tr>
                                                
                                                @php
                                                    $hasExtraRow = false;
                                                    foreach($penalties as $p) {
                                                        if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 11) {
                                                            $hasExtraRow = true;
                                                            break;
                                                        }
                                                    }
                                                @endphp
                                                
                                                @if($hasExtraRow)
                                                <tr class="text-center border-top-0">
                                                    <td class="p-1">
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 11)
                                                                {{ $p->result }}
                                                            @endif
                                                        @endforeach
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 12)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 13)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 14)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 15)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                </tr>
                                                @endif
                                            </tbody>
                                        </table>
                                    </div>
                                    
                                    <div class="p-0 col-6 sub-table-2">
                                        <table class="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th colspan="6" class="p-1 px-3 text-center th-border th">
                                                        -
                                                    </th>
                                                </tr>
                                                <tr>
                                                    <th class="p-1 px-0 text-center" colspan="6">
                                                        الفريق(ب) : 
                                                        @foreach($clubs as $c)
                                                            @if($c->id == $rapport->club_id_2)
                                                                {{ $c->abbr }}
                                                            @endif
                                                        @endforeach
                                                    </th>
                                                </tr>
                                                <tr class="text-center border-top-0">
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 1)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 2)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 3)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 4)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 5)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1" rowspan="2">مجموع الأهداف</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="text-center">
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 6)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 7)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 8)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 9)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 10)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1" rowspan="2">
                                                        @php 
                                                            $count = 0;
                                                            foreach($penalties as $p) {
                                                                if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->result == 1) {
                                                                    $count++;
                                                                }
                                                            }
                                                            if($count < 10) echo "0";
                                                            echo $count;
                                                        @endphp
                                                    </td>
                                                </tr>
                                                
                                                @php
                                                    $hasExtraRow = false;
                                                    foreach($penalties as $p) {
                                                        if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 11) {
                                                            $hasExtraRow = true;
                                                            break;
                                                        }
                                                    }
                                                @endphp
                                                
                                                @if($hasExtraRow)
                                                <tr class="text-center border-top-0">
                                                    <td class="p-1">
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 11)
                                                                {{ $p->result }}
                                                            @endif
                                                        @endforeach
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 12)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 13)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 14)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                    <td class="p-1">
                                                        @php $found = false; @endphp
                                                        @foreach($penalties as $p)
                                                            @if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 15)
                                                                {{ $p->result }}
                                                                @php $found = true; @endphp
                                                            @endif
                                                        @endforeach
                                                        @if(!$found) - @endif
                                                    </td>
                                                </tr>
                                                @endif
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Left Side - Changes and Goals -->
                <div class="col-6">
                    <!-- Changes Tables - Side by Side -->
                    <div class="tables-container">
                        <!-- Team 1 Changes -->
                        <div class="table-half sub-table-1">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="p-1 px-3 text-center text-dark th">التغييرات</th>
                                    </tr>
                                    <tr>
                                        <th class="p-1 px-0 text-center team-header" colspan="3">
                                            الفريق(أ) : 
                                            @foreach($clubs as $c)
                                                @if($c->id == $rapport->club_id_1)
                                                    {{ $c->abbr }}
                                                @endif
                                            @endforeach
                                        </th>
                                    </tr>
                                    <tr class="text-center border-top-0">
                                        <th class="p-1">خروج</th>
                                        <th class="p-1">دخول</th>
                                        <th class="p-1">الدقيقة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if(empty($changementsClub1) || count($changementsClub1) == 0 && $restCH1 == 0)
                                        <tr class="text-center">
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                        </tr>
                                    @else
                                        @foreach($changementsClub1 as $ch)
                                            <tr class="text-center">
                                                <td class="p-1">{{ $ch->joueur_num_sort }}</td>
                                                <td class="p-1">{{ $ch->joueur_num_entr }}</td>
                                                <td class="p-1">{{ $ch->minute }}</td>
                                            </tr>
                                        @endforeach
                                        @for($i = 0; $i < $restCH1; $i++)
                                            <tr class="text-center borderd">
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                            </tr>
                                        @endfor
                                    @endif
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Team 2 Changes -->
                        <div class="table-half sub-table-2">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="p-1 px-3 text-center text-dark th">التغييرات</th>
                                    </tr>
                                    <tr>
                                        <th class="p-1 px-0 text-center team-header" colspan="3">
                                            الفريق (ب) : 
                                            @foreach($clubs as $c)
                                                @if($c->id == $rapport->club_id_2)
                                                    {{ $c->abbr }}
                                                @endif
                                            @endforeach
                                        </th>
                                    </tr>
                                    <tr class="text-center border-top-0">
                                        <th class="p-1">خروج</th>
                                        <th class="p-1">دخول</th>
                                        <th class="p-1">الدقيقة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if(empty($changementsClub2) || count($changementsClub2) == 0 && $restCH2 == 0)
                                        <tr class="text-center">
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                        </tr>
                                    @else
                                        @foreach($changementsClub2 as $ch)
                                            <tr class="text-center">
                                                <td class="p-1">{{ $ch->joueur_num_sort }}</td>
                                                <td class="p-1">{{ $ch->joueur_num_entr }}</td>
                                                <td class="p-1">{{ $ch->minute }}</td>
                                            </tr>
                                        @endforeach
                                        @for($i = 0; $i < $restCH2; $i++)
                                            <tr class="text-center borderd">
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                            </tr>
                                        @endfor
                                    @endif
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Goals Tables - Side by Side -->
                    <div class="tables-container">
                        <!-- Team 1 Goals -->
                        <div class="table-half">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="p-1 px-3 text-center text-dark th">الأهداف</th>
                                    </tr>
                                    <tr>
                                        <th class="p-1 px-0 text-center team-header" colspan="3">
                                            الفريق(أ) : 
                                            @foreach($clubs as $c)
                                                @if($c->id == $rapport->club_id_1)
                                                    {{ $c->abbr }}
                                                @endif
                                            @endforeach
                                        </th>
                                    </tr>
                                    <tr class="text-center border-top-0">
                                        <th class="p-1">رقم اللاعب</th>
                                        <th class="p-1">إسم اللاعب</th>
                                        <th class="p-1">الدقيقة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if(empty($butsClub1) || count($butsClub1) == 0 && $restBUT1 == 0)
                                        <tr class="text-center">
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                        </tr>
                                    @else
                                        @foreach($butsClub1 as $but)
                                            <tr class="text-center">
                                                <td class="p-1">{{ $but->joueur_numero }}</td>
                                                <td class="p-1">{{ $but->joueur_nom }}</td>
                                                <td class="p-1">{{ $but->minute }}</td>
                                            </tr>
                                        @endforeach
                                        @for($i = 0; $i < $restBUT1; $i++)
                                            <tr class="text-center borderd">
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                            </tr>
                                        @endfor
                                    @endif
                                </tbody>
                            </table>
                        </div>
                        
                        <!-- Team 2 Goals -->
                        <div class="table-half">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th colspan="3" class="p-1 px-3 text-center text-dark th">الأهداف</th>
                                    </tr>
                                    <tr>
                                        <th class="p-1 px-0 text-center team-header" colspan="3">
                                            الفريق (ب) : 
                                            @foreach($clubs as $c)
                                                @if($c->id == $rapport->club_id_2)
                                                    {{ $c->abbr }}
                                                @endif
                                            @endforeach
                                        </th>
                                    </tr>
                                    <tr class="text-center border-top-0">
                                        <th class="p-1">رقم اللاعب</th>
                                        <th class="p-1">إسم اللاعب</th>
                                        <th class="p-1">الدقيقة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    @if(empty($butsClub2) || count($butsClub2) == 0 && $restBUT2 == 0)
                                        <tr class="text-center">
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                            <td class="p-1 empty-cell">-</td>
                                        </tr>
                                    @else
                                        @foreach($butsClub2 as $but)
                                            <tr class="text-center">
                                                <td class="p-1">{{ $but->joueur_numero }}</td>
                                                <td class="p-1">{{ $but->joueur_nom }}</td>
                                                <td class="p-1">{{ $but->minute }}</td>
                                            </tr>
                                        @endforeach
                                        @for($i = 0; $i < $restBUT2; $i++)
                                            <tr class="text-center borderd">
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                                <td class="py-1 empty-cell">-</td>
                                            </tr>
                                        @endfor
                                    @endif
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <!-- Full-width Penalties section -->

                </div>

                <!-- <div class="container"><div class="mt-5 expl-content01" style="font-size: 11px"><p class="d-flex align-items-center">(*) في حالة ركلات الترجيحية , يتم تعبئة الخانة كالآتي : تسجيل الركلة :<table class="table w-auto table-bordered me-2 ms-2" style="width: 2rem"><thead><tr><th style="line-height: 0px; padding-top: 11px; font-size: 7px;">09</th></tr></thead><tbody><tr><td style="line-height: 1px; font-family: FontAwesome; padding-right: 10px; font-size: 7px;">X</td></tr></tbody></table>ضياع الركلة الترجيحية :<table class="table w-auto table-bordered me-2" style="width: 2rem"><thead><tr><th style="line-height: 0px; padding-top: 11px; font-size: 7px;">09</th></tr></thead><tbody><tr><td style="line-height: 1px; font-family: FontAwesome; padding-right: 10px; font-size: 7px;">O</td></tr></tbody></table></p></div></div> -->
            </div>
            
            @if(isset($skipTable) && $skipTable)
                <div class="page-break"></div>
            @endif
            
            <!-- Additional Report Content -->
            <div class="container 
            {{ (isset($skipTable) && $skipTable) ? 'page-break contentP2' : '' }}
            ">
                <div class="expl-content02">
                    <p>يشار هنا إلى جميع الأحداث المسجلة قبل وأثناء وبعد المباراة مع تحديد حالة الملعب وتصرفات الجمهور</p>
                </div>
                <div>
                    <div class="ligne">
                        {{ $rapport->rapport_supp ?? '-' }}
                    </div>
                </div>
                <table class="signature" style="width: 100%; border: none; margin-bottom: 20px; margin-top: 25px;">
                    <tr>
                        <td style="width: 33%; text-align: right; border: none; font-size: 1rem; color: #000;">
                            حرر في مدينة : 
                            
                        </td>
                        <td style="width: 33%; text-align: center; border: none; font-size: 1rem; color: #000;">
                            بتاريخ : {{ date('d-m-Y', strtotime($rapport->date)) }}
                        </td>
                        <td style="width: 33%; text-align: center; border: none; font-size: 1rem; color: #000;">
                            إمضاء الحكم : 
                          
                        </td>
                    </tr>
                </table>
            </div>
            
            
    </div>
</body>
</html>