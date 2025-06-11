<!DOCTYPE html>
<html  dir="rtl" lang="ar">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>تقرير المباراة</title>
    <style>
        body {
            font-family: 'amiri', sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: #333;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
        }
        .logo {
            max-width: 120px;
            margin-bottom: 10px;
        }
        h1 {
            font-size: 22px;
            margin: 0 0 5px;
        }
        .match-info {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        .match-info th, .match-info td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        .match-info th {
            background-color: #f2f2f2;
            text-align: right;
            width: 30%;
        }
        .teams {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        .team {
            width: 45%;
            text-align: center;
        }
        .score {
            font-size: 24px;
            font-weight: bold;
            margin: 0 10px;
        }
        .events-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        .events-table th, .events-table td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: right;
        }
        .events-table th {
            background-color: #f2f2f2;
        }
        .section {
            margin-top: 20px;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
        .referee-signature {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
        }
        .signature-box {
            width: 30%;
            border-top: 1px dotted #333;
            padding-top: 5px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>تقرير المباراة الرسمي</h1>
        <p>{{ $match->competition->nom ?? 'البطولة' }} - الموسم {{ $match->saison->nom ?? '' }}</p>
    </div>
    
    <table class="match-info">
        <tr>
            <th>تاريخ المباراة</th>
            <td>{{ date('d/m/Y', strtotime($match->date)) }}</td>
        </tr>
        <tr>
            <th>توقيت المباراة</th>
            <td>{{ date('H:i', strtotime($match->heure)) }}</td>
        </tr>
        <tr>
            <th>الملعب</th>
            <td>{{ $match->stade->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>الفريق المضيف</th>
            <td>{{ $match->equipeA->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>الفريق الزائر</th>
            <td>{{ $match->equipeB->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>النتيجة النهائية</th>
            <td>{{ $match->but_equipe_a ?? '0' }} - {{ $match->but_equipe_b ?? '0' }}</td>
        </tr>
        <tr>
            <th>الحكم الرئيسي</th>
            <td>{{ $match->arbitre->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>مساعد الحكم الأول</th>
            <td>{{ $match->arbitreAssistant1->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>مساعد الحكم الثاني</th>
            <td>{{ $match->arbitreAssistant2->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>الحكم الرابع</th>
            <td>{{ $match->quatriemeArbitre->nom ?? 'غير محدد' }}</td>
        </tr>
        <tr>
            <th>مندوب المباراة</th>
            <td>{{ $match->delegue->nom ?? 'غير محدد' }}</td>
        </tr>
    </table>
    
    <div class="section">
        <h3>الأهداف</h3>
        @if($match->buts && count($match->buts) > 0)
            <table class="events-table">
                <thead>
                    <tr>
                        <th>الدقيقة</th>
                        <th>الفريق</th>
                        <th>اللاعب</th>
                        <th>نوع الهدف</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($match->buts as $but)
                    <tr>
                        <td>{{ $but->minute ?? '0' }}</td>
                        <td>{{ $but->club->nom ?? 'غير محدد' }}</td>
                        <td>{{ $but->joueur->nom_complet ?? 'غير محدد' }}</td>
                        <td>{{ $but->type_but ?? 'عادي' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <p>لا توجد أهداف مسجلة</p>
        @endif
    </div>
    
    <div class="section">
        <h3>البطاقات والإنذارات</h3>
        @if($match->avertissements && count($match->avertissements) > 0)
            <table class="events-table">
                <thead>
                    <tr>
                        <th>الدقيقة</th>
                        <th>الفريق</th>
                        <th>اللاعب</th>
                        <th>نوع البطاقة</th>
                        <th>السبب</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($match->avertissements as $avertissement)
                    <tr>
                        <td>{{ $avertissement->minute ?? '0' }}</td>
                        <td>{{ $avertissement->club->nom ?? 'غير محدد' }}</td>
                        <td>{{ $avertissement->joueur->nom_complet ?? $avertissement->nom }}</td>
                        <td>{{ $avertissement->type_avertissement == 'jaune' ? 'بطاقة صفراء' : 'بطاقة حمراء' }}</td>
                        <td>{{ $avertissement->motif ?? '' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <p>لا توجد بطاقات مسجلة</p>
        @endif
    </div>
    
    <div class="section">
        <h3>التغييرات</h3>
        @if($match->changements && count($match->changements) > 0)
            <table class="events-table">
                <thead>
                    <tr>
                        <th>الدقيقة</th>
                        <th>الفريق</th>
                        <th>اللاعب الخارج</th>
                        <th>اللاعب الداخل</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($match->changements as $changement)
                    <tr>
                        <td>{{ $changement->minute ?? '0' }}</td>
                        <td>{{ $changement->club->nom ?? 'غير محدد' }}</td>
                        <td>{{ $changement->joueurSortant->nom_complet ?? 'غير محدد' }}</td>
                        <td>{{ $changement->joueurEntrant->nom_complet ?? 'غير محدد' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        @else
            <p>لا توجد تغييرات مسجلة</p>
        @endif
    </div>
    
    @if($match->penalties && count($match->penalties) > 0)
    <div class="section">
        <h3>ركلات الترجيح</h3>
        <table class="events-table">
            <thead>
                <tr>
                    <th>الفريق</th>
                    <th>اللاعب</th>
                    <th>النتيجة</th>
                </tr>
            </thead>
            <tbody>
                @foreach($match->penalties as $penalty)
                <tr>
                    <td>{{ $penalty->club->nom ?? 'غير محدد' }}</td>
                    <td>{{ $penalty->joueur->nom_complet ?? 'غير محدد' }}</td>
                    <td>{{ $penalty->status ? 'ناجحة' : 'مصدودة' }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    @endif
    
    <div class="section">
        <h3>ملاحظات الحكم</h3>
        <p>{{ $match->notes_arbitre ?? 'لا توجد ملاحظات' }}</p>
    </div>
    
    <div class="referee-signature">
        <div class="signature-box">
            <p>توقيع الحكم</p>
        </div>
        <div class="signature-box">
            <p>توقيع المندوب</p>
        </div>
        <div class="signature-box">
            <p>ختم الاتحاد</p>
        </div>
    </div>
</body>
</html>