<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>@foreach($clubs as $club)
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
            
                تقرير مبارة
            </title>
    <style>

        
        /* Styles de base */
        body {
            font-family: '{{ $fontname }}', sans-serif;
            direction: rtl;
            color: #000;
            margin: 0;
            padding: 15px;
        }
        
        /* Tableaux */
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            border: 1px solid #000; /* Ajout de bordure par défaut */
        }
        
        table, th, td {
            border: 1px solid #000;
        }
        
        th, td {
            padding: 5px;
            text-align: center;
        }
        
        /* En-tête sans bordures */
        .header-table {
            border: none;
        }
        
        .header-table td {
            border: none;
        }
        
        /* Cellule d'en-tête grise */
        .header-cell {
            background-color: #cccccc;
            font-weight: bold;
        }
        
        /* Cellule vide */
        .empty-cell {
            color: #999;
        }
    </style>
</head>
<body>
    

     <table style="width:100%; border:none;">
        <tr>
            <td style="border:none; height:160px;"></td>
        </tr>
    </table>
    
    <!-- Titre du rapport -->
    <table style="width: 100%; margin-bottom: 20px; background-color: #cccccc;">
        <tr>
            <td style="text-align: center; font-size: 24px; font-weight: bold; padding: 10px;">
                تقريـــــــر الحكـــــم
            </td>
        </tr>
    </table>

       <table style="width:100%; border:none;">
                <tr>
                    <td style="border:none; height:20px;"></td>
                </tr>
            </table>
    
    <!-- Informations du match -->
    <table style="width: 100%; margin-bottom: 20px;">
        <tr>
            <td style="width: 15%; background-color: #cccccc; font-weight: bold; border: solid #000 2px">المنافسة/الفئة</td>
            <td style="width: 18%; border: solid #000 2px">{{ $rapport->competition->nom ?? '-' }}</td>
            <td style=" border: solid #000 2px">
                @foreach($categories as $category)
                    @if($category->id == $rapport->categorie_id)
                        {{ $category->nom }}
                    @endif
                @endforeach
            </td>
            <td style="width: 10%; background-color: #cccccc; font-weight: bold; border: solid #000 2px">الساعة</td>
            <td style="width: 10%; border: solid #000 2px">{{ $rapport->temps }}</td>
            <td style="width: 10%; background-color: #cccccc; font-weight: bold; border: solid #000 2px">حكم الساحة</td>
            <td  style="width: 22.7%;  border: solid #000 2px;">
                @foreach($arbitres as $arbitre)
                    @if($arbitre->id == $rapport->arbitre_c_id)
                        {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                    @endif
                @endforeach
            </td>
        </tr>
        <tr>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px">المباراة</td>
            <td style="border: solid #000 2px" colspan="2">
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
            </td>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px">الملعب</td>
            <td style="border: solid #000 2px">{{ $rapport->stade->nom }}</td>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px">الحكم المساعد 1</td>
            <td style="width: 22.7%;  border: solid #000 2px;">
                @foreach($arbitres as $arbitre)
                    @if($arbitre->id == $rapport->arbitre_a1_id)
                        {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                    @endif
                @endforeach
            </td>
        </tr>
        <tr> 
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px;">النتيجة النهائية</td>
            <td style="border: solid #000 2px;" colspan="2" border: solid #000 2px;>
                {{ $rapport->result_club_1 ?? $rapport->but_club1 }} - {{ $rapport->result_club_2 ?? $rapport->but_club2 }}
            </td>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px;">المدينة</td>
            <td style="border: solid #000 2px;">{{ $rapport->ville->nom ?? '-' }}</td>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px;">الحكم المساعد 2</td>
            <td style="width: 22.7%;  border: solid #000 2px; ">
                @foreach($arbitres as $arbitre)
                    @if($arbitre->id == $rapport->arbitre_a2_id)
                        {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                    @endif
                @endforeach
            </td>
        </tr>
        <tr>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px;">التاريخ</td>
            <td colspan="2" style=" border: solid #000 2px;">{{ $rapport->date }}</td>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px;">المندوب</td>
            <td style="border: solid #000 2px;">{{ $rapport->delegue->prenom ?? '-' }} {{ $rapport->delegue->nom ?? '-' }}</td>
            <td style="background-color: #cccccc; font-weight: bold; border: solid #000 2px;">الحكم الرابع</td>
            <td style="border: solid #000 2px;">
                @foreach($arbitres as $arbitre)
                    @if($arbitre->id == $rapport->arbitre_4_id)
                        {{ strtoupper($arbitre->prenom) }} {{ strtoupper($arbitre->nom) }}
                    @endif
                @endforeach
            </td>
        </tr>
    </table>

        <!-- Pour fait un espace entre les sections -->
       <table style="width:100%; border:none;">
                <tr>
                    <td style="border:none; height:0px;"></td>
                </tr>
        </table>
    
    <!-- Tables en deux colonnes -->
    <table style="width: 100%; border: none;">
        <tr>
            <!-- Colonne gauche avec cartons jaunes et rouges -->
            <td style="width: 50%; vertical-align: top; border: none; padding-right: 5px;">

      
            
                <!-- Cartons jaunes -->
                <table style="width: 100%;">
                    <tr>
                        <td colspan="5" style="background-color: #cccccc; font-weight: bold; border: solid #000 2px">الانذارات</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; border: solid #000 2px; width: 65px">الفريق</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 210px">إسم اللاعب</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 210px">الرخصة</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 210px">سبب الإنذار</td>
                        <td style="font-weight: bold; border: solid #000 2px;  width: 46px">الدقيقة</td>
                    </tr>
                    @if(empty($avertissementsG) || count($avertissementsG) == 0)
                        <tr>
                            <td style="color: #999; border: solid #000 2px">-</td>
                            <td style="color: #999; border: solid #000 2px">-</td>
                            <td style="color: #999; border: solid #000 2px">-</td>
                            <td style="color: #999; border: solid #000 2px">-</td>
                            <td style="color: #999; border: solid #000 2px">-</td>
                        </tr>
                    @else
                        @foreach($avertissementsG as $a)
                            <tr>
                                <td style="border: solid #000 2px">
                                    @foreach($clubs as $c)
                                        @if($c->id == $a->club_id)
                                            {{ $c->abbr }}
                                        @endif
                                    @endforeach
                                </td>
                                <td style="border: solid #000 2px">{{ $a->nom }}</td>
                                <td style="border: solid #000 2px">{{ $a->joueur_numero_licence }}</td>
                                <td style="border: solid #000 2px">{{ $a->cause }}</td>
                                <td style="border: solid #000 2px">{{ $a->minute }}</td>
                            </tr>
                        @endforeach
                    @endif
                </table>
            <!-- </td>
        </tr>
    </table> -->

                                <!-- Pour fait un espace entre les sections -->
                <table style="width:100%; border:none;">
                            <tr>
                                <td style="border:none; height:20px;"></td>
                            </tr>
                    </table>
    
                
                <!-- Cartons rouges -->
                <table style="width: 100%;">
                    <tr>
                        <td colspan="5" style="background-color: #cccccc; font-weight: bold; border: solid #000 2px">الطرد</td>
                    </tr>
                    <tr>
                        <td style="font-weight: bold; border: solid #000 2px; width: 65px">الفريق</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 210px">إسم اللاعب</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 210px">الرخصة</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 210px">سبب الطرد</td>
                        <td style="font-weight: bold; border: solid #000 2px; width: 46px">الدقيقة</td>
                    </tr>
                    @if(empty($avertissementsR) || count($avertissementsR) == 0)
                        <tr>
                            <td style="border: solid #000 2px; color: #999;">-</td>
                            <td style="border: solid #000 2px; color: #999;">-</td>
                            <td style="border: solid #000 2px; color: #999;">-</td>
                            <td style="border: solid #000 2px; color: #999;">-</td>
                            <td style="border: solid #000 2px; color: #999;">-</td>
                        </tr>
                    @else
                        @foreach($avertissementsR as $a)
                            <tr>
                                <td style="border: solid #000 2px">
                                    @foreach($clubs as $c)
                                        @if($c->id == $a->club_id)
                                            {{ $c->abbr }}
                                        @endif
                                    @endforeach
                                </td>
                                <td style="border: solid #000 2px">{{ $a->nom }}</td>
                                <td style="border: solid #000 2px">{{ $a->joueur_numero_licence }}</td>
                                <td style="border: solid #000 2px">{{ $a->cause }}</td>
                                <td style="border: solid #000 2px">{{ $a->minute }}</td>
                            </tr>
                        @endforeach
                    @endif
                </table>

                                <!-- Pour fait un espace entre les sections -->
                <table style="width:100%; border:none;">
                            <tr>
                                <td style="border:none; height:20px;"></td>
                            </tr>
                    </table>

    @if (!$skipPinalties)

                      <!-- PUIS nouvelle rangée pour les penalties -->
<table style="width: 100%; border: none;">
    <tr>
        <td style="width: 100%; vertical-align: top; border: none; padding-left: 5px;">
            <!-- Section des penalties avec 2 tableaux côte à côte -->
            <table style="width: 100%; border: none; border-spacing: 0; border-collapse: collapse;">
                <tr>
                    <!-- En-tête commune aux deux tableaux -->
                    <td colspan="2" style="background-color: #cccccc; font-weight: bold; text-align: center; border: solid #000 2px">
                        ضربات الترجيح
                    </td>
                </tr>
                <tr >
                    <!-- Cellule pour l'équipe A - SUPPRESSION DE L'ESPACE à droite -->
                    <td style="width: 50%; padding: 0; border: solid #000 2px;">
                        
                        <table style="width: 100%;">
                            <tr>
                                <td colspan="6" style="background-color: #f0f0f0; font-weight: bold; text-align: center; border: solid #000 2px;">
                                    الفريق(أ) : 
                                    @foreach($clubs as $c)
                                        @if($c->id == $rapport->club_id_1)
                                            {{ $c->abbr }}
                                        @endif
                                    @endforeach
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 1) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 2) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 3) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 4) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 5) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: auto;">مجموع الأهداف</td>
                            </tr>

                            <tr>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 6) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 7) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 8) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 9) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 10) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                      <td rowspan="2" style="border: solid #000 2px; width: auto;">
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
                        </table>
                    </td>
                    
                    <!-- Cellule pour l'équipe B -->
                    <td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td colspan="6" style="background-color: #f0f0f0; font-weight: bold; text-align: center; border: solid #000 2px">
                                    الفريق(ب) : 
                                    @foreach($clubs as $c)
                                        @if($c->id == $rapport->club_id_2)
                                            {{ $c->abbr }}
                                        @endif
                                    @endforeach
                                </td>
                            </tr>
                            <tr>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 1) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 2) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 3) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 4) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 5) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px; width: auto;">مجموع الأهداف</td>
                              
                            </tr>
                            <tr>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 6) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 7) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 8) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 9) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 10) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                  <td rowspan="2" style="border: solid #000 2px; width: auto;">
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
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
       @endif         
            </td>
            
            <!-- Colonne droite avec changements et buts -->
            <td style="width: 50%; vertical-align: top; border: none; padding-left: 5px;">

            
                <!-- Tableau de changements -->
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td colspan="2" style="background-color: #cccccc; font-weight: bold; text-align: center; border: solid #000 2px">
                            التغييرات
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%; padding: 0; border: none; vertical-align: top;"><!--
                        -->
                            <table style="width: 100%; border-collapse: collapse;">
                                <!-- Contenu table équipe A -->
                                <tr>
                                    <td colspan="3" style="background-color: #f0f0f0; font-weight: bold; text-align: center; border: solid #000 2px">
                                        الفريق(أ) : 
                                        @foreach($clubs as $c)
                                            @if($c->id == $rapport->club_id_1)
                                                {{ $c->abbr }}
                                            @endif
                                        @endforeach
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; border: solid #000 2px;">خروج</td>
                                    <td style="font-weight: bold; border: solid #000 2px;">دخول</td>
                                    <td style="font-weight: bold; border: solid #000 2px;">الدقيقة</td>
                                </tr>
                                @if(empty($changementsClub1) || count($changementsClub1) == 0 && $restCH1 == 0)
                                    <tr>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                    </tr>
                                @else
                                    @foreach($changementsClub1 as $ch)
                                        <tr>
                                            <td style="border: solid #000 2px;">{{ $ch->joueur_num_sort }}</td>
                                            <td style="border: solid #000 2px;">{{ $ch->joueur_num_entr }}</td>
                                            <td style="border: solid #000 2px;">{{ $ch->minute }}</td>
                                        </tr>
                                    @endforeach
                                    @for($i = 0; $i < $restCH1; $i++)
                                        <tr>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                        </tr>
                                    @endfor
                                @endif
                            </table>
                        </td><!--
                        --><td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <!-- Contenu table équipe B -->
                                <tr>
                                    <td colspan="3" style="background-color: #f0f0f0; font-weight: bold; text-align: center; border: solid #000 2px">
                                        الفريق (ب) : 
                                        @foreach($clubs as $c)
                                            @if($c->id == $rapport->club_id_2)
                                                {{ $c->abbr }}
                                            @endif
                                        @endforeach
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; border: solid #000 2px;">خروج</td>
                                    <td style="font-weight: bold; border: solid #000 2px;">دخول</td>
                                    <td style="font-weight: bold; border: solid #000 2px;">الدقيقة</td>
                                </tr>
                                @if(empty($changementsClub2) || count($changementsClub2) == 0 && $restCH2 == 0)
                                    <tr>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                    </tr>
                                @else
                                    @foreach($changementsClub2 as $ch)
                                        <tr>
                                            <td style="border: solid #000 2px;">{{ $ch->joueur_num_sort }}</td>
                                            <td style="border: solid #000 2px;">{{ $ch->joueur_num_entr }}</td>
                                            <td style="border: solid #000 2px;">{{ $ch->minute }}</td>
                                        </tr>
                                    @endforeach
                                    @for($i = 0; $i < $restCH2; $i++)
                                        <tr>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                        </tr>
                                    @endfor
                                @endif
                            </table>
                        </td>
                    </tr>
                </table>
                
                <!-- Espacement entre tableaux -->
                <table style="width:100%; border:none;">
                    <tr><td style="border:none; height:10px;"></td></tr>
                </table>
                
                @if (!$skipButs)
                
                <!-- Tableau des buts -->
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td colspan="2" style="background-color: #cccccc; font-weight: bold; text-align: center; border: solid #000 2px">
                            الأهداف
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td colspan="3" style="background-color: #f0f0f0; font-weight: bold; border: solid #000 2px; text-align: center;">
                                        الفريق(أ) :
                                        @foreach($clubs as $c)
                                            @if($c->id == $rapport->club_id_1)
                                                {{ $c->abbr }}
                                            @endif
                                        @endforeach
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 22%">رقم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 58%">إسم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px;  width: 20%">الدقيقة</td>
                                </tr>
                                @if(empty($butsClub1) || count($butsClub1) == 0 && $restBUT1 == 0)
                                    <tr>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                    </tr>
                                @else
                                    @foreach($butsClub1 as $but)
                                        <tr>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_numero }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_nom }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->minute }}</td>
                                        </tr>
                                    @endforeach
                                    @for($i = 0; $i < $restBUT1; $i++)
                                        <tr>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                        </tr>
                                    @endfor
                                @endif
                            </table>
                        </td>
                        <td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td colspan="3" style="background-color: #f0f0f0; font-weight: bold; border: solid #000 2px; text-align: center;">
                                        الفريق (ب) :
                                        @foreach($clubs as $c)
                                            @if($c->id == $rapport->club_id_2)
                                                {{ $c->abbr }}
                                            @endif
                                        @endforeach
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 22%">رقم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 58%">إسم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 20%">الدقيقة</td>
                                </tr>
                                @if(empty($butsClub2) || count($butsClub2) == 0 && $restBUT2 == 0)
                                    <tr>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                    </tr>
                                @else
                                    @foreach($butsClub2 as $but)
                                        <tr>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_numero }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_nom }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->minute }}</td>
                                        </tr>
                                    @endforeach
                                    @for($i = 0; $i < $restBUT2; $i++)
                                        <tr>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                        </tr>
                                    @endfor
                                @endif
                            </table>
                        </td>
                    </tr>
                </table>
                @endif
            </td>
        </tr>
    </table>
    
    
    @if(isset($skipSignature) && $skipSignature)
        <div style="page-break-before: always;"></div>
    @endif

                      <!-- Pour fait un espace entre les sections -->
    <table style="width:100%; border:none;">
        <tr>
            <td style="border:none; {{ $skipSignature ? 'height:130px;' : '20px'}}"></td>
        </tr>
    </table>

     @if ($skipButs)
                <!-- Tableau des buts -->
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td colspan="2" style="background-color: #cccccc; font-weight: bold; text-align: center; border: solid #000 2px">
                            الأهداف
                        </td>
                    </tr>
                    <tr>
                        <td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td colspan="3" style="background-color: #f0f0f0; font-weight: bold; border: solid #000 2px; text-align: center;">
                                        الفريق(أ) :
                                        @foreach($clubs as $c)
                                            @if($c->id == $rapport->club_id_1)
                                                {{ $c->abbr }}
                                            @endif
                                        @endforeach
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 22%">رقم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 58%">إسم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px;  width: 20%">الدقيقة</td>
                                </tr>
                                @if(empty($butsClub1) || count($butsClub1) == 0 && $restBUT1 == 0)
                                    <tr>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                    </tr>
                                @else
                                    @foreach($butsClub1 as $but)
                                        <tr>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_numero }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_nom }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->minute }}</td>
                                        </tr>
                                    @endforeach
                                    @for($i = 0; $i < $restBUT1; $i++)
                                        <tr>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                        </tr>
                                    @endfor
                                @endif
                            </table>
                        </td>
                        <td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td colspan="3" style="background-color: #f0f0f0; font-weight: bold; border: solid #000 2px; text-align: center;">
                                        الفريق (ب) :
                                        @foreach($clubs as $c)
                                            @if($c->id == $rapport->club_id_2)
                                                {{ $c->abbr }}
                                            @endif
                                        @endforeach
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 22%">رقم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 58%">إسم اللاعب</td>
                                    <td style="font-weight: bold; border: solid #000 2px; width: 20%">الدقيقة</td>
                                </tr>
                                @if(empty($butsClub2) || count($butsClub2) == 0 && $restBUT2 == 0)
                                    <tr>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                        <td style="color: #999; border: solid #000 2px;">-</td>
                                    </tr>
                                @else
                                    @foreach($butsClub2 as $but)
                                        <tr>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_numero }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->joueur_nom }}</td>
                                            <td style="border: solid #000 2px;">{{ $but->minute }}</td>
                                        </tr>
                                    @endforeach
                                    @for($i = 0; $i < $restBUT2; $i++)
                                        <tr>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                            <td style="color: #999; border: solid #000 2px;">-</td>
                                        </tr>
                                    @endfor
                                @endif
                            </table>
                        </td>
                    </tr>
                </table>

                @if ($skipButs && $skipPinalties && $butsCount > 15)
                    
                @else
                     <table style="width:100%; border:none;">
                        <tr>
                            <td style="border:none; height: 20px"></td>
                        </tr>
                    </table>           
                @endif

@endif



    @if (isset($skipPinalties) && $skipPinalties)
                   <!-- PUIS nouvelle rangée pour les penalties -->
<table style="width: 100%; border: none;">
    <tr>
        <td style="width: 100%; vertical-align: top; border: none; padding-left: 5px;">
            <!-- Section des penalties avec 2 tableaux côte à côte -->
            <table style="width: 100%; border: none; border-spacing: 0; border-collapse: collapse;">
                <tr>
                    <!-- En-tête commune aux deux tableaux -->
                    <td colspan="2" style="background-color: #cccccc; font-weight: bold; text-align: center; border: solid #000 2px">
                        ضربات الترجيح
                    </td>
                </tr>
                <tr >
                    <!-- Cellule pour l'équipe A - SUPPRESSION DE L'ESPACE à droite -->
                    <td style="width: 50%; padding: 0; border: solid #000 2px;">
                        
                        <table style="width: 100%;">
                            <tr>
                                <td colspan="6" style="background-color: #f0f0f0; font-weight: bold; text-align: center; border: solid #000 2px;">
                                    الفريق(أ) : 
                                    @foreach($clubs as $c)
                                        @if($c->id == $rapport->club_id_1)
                                            {{ $c->abbr }}
                                        @endif
                                    @endforeach
                                </td>
                            </tr>
                            
                            <tr>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 1) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 2) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 3) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 4) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: 13%; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 5) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px;  width: auto;">مجموع الأهداف</td>
                            </tr>

                            <tr>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 6) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 7) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 8) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px; ">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 9) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_1 && $p->opportunity == 10) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                      <td rowspan="2" style="border: solid #000 2px; width: auto;">
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
                        </table>
                    </td>
                    
                    <!-- Cellule pour l'équipe B -->
                    <td style="width: 50%; padding: 0; border: none; vertical-align: top;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td colspan="6" style="background-color: #f0f0f0; font-weight: bold; text-align: center; border: solid #000 2px">
                                    الفريق(ب) : 
                                    @foreach($clubs as $c)
                                        @if($c->id == $rapport->club_id_2)
                                            {{ $c->abbr }}
                                        @endif
                                    @endforeach
                                </td>
                            </tr>
                            <tr>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 1) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 2) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 3) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 4) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 5) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px; width: auto;">مجموع الأهداف</td>
                              
                            </tr>
                            <tr>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 6) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 7) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 8) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 9) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                <td style="border: solid #000 2px ; width: 13%;">
                                    @php 
                                        $found = false;
                                        foreach($penalties as $p) {
                                            if($p->matche_id == $rapport->id && $p->club_id == $rapport->club_id_2 && $p->opportunity == 10) {
                                                echo $p->result;
                                                $found = true;
                                            }
                                        }
                                        if(!$found) echo "-";
                                    @endphp
                                </td>
                                  <td rowspan="2" style="border: solid #000 2px; width: auto;">
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
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>       
@endif

<table style="width:100%; border:none;">
        <tr>
            <td style="border:none; height: 20px"></td>
        </tr>
    </table>
    
    <!-- Remarques et signature -->
    <table style="width: 100%; margin-top: 15px; border: none;">
        <tr>
            <td style="background-color: #cccccc; font-weight: bold; text-align: right;    border-collapse: separate;
 "> <span> </span> ملاحظات الحكم </td>
        </tr>
        <tr>
            <td style="text-align: right; height: 30px; vertical-align: top; background-color: #f0f0f0;">
                {{ $rapport->rapport_supp ?? '-' }}
            </td>
        </tr>
    </table>

    <!-- Pour fait un espace entre les sections -->
                <table style="width:100%; border:none;">
                            <tr>
                                <td style="border:none; height:20px;"></td>
                            </tr>
                    </table>
    <!-- Signature -->
    <table style="width: 100%; border: none;">
        <tr>
            <td style="width: 33%; text-align: right; border: none;">
                حرر في مدينة : 
            </td>
            <td style="width: 33%; text-align: center; border: none;">
                بتاريخ : {{ date('d-m-Y', strtotime($rapport->date)) }}
            </td>
            <td style="width: 33%; text-align: center; border: none;">
                إمضاء الحكم : 
            </td>
        </tr>
    </table>
</body>
</html>