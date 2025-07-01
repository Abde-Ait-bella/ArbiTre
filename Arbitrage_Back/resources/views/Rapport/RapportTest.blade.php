<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: aealarabiya, sans-serif;
            direction: rtl;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>تقرير المباراة</h1>
    
    <table>
        <tr>
            <td>بيانات المباراة</td>
            <td>{{ $rapport->id }}</td>
        </tr>
        <tr>
            <td>الفريق الأول</td>
            <td>
                @foreach($clubs as $c)
                    @if($c->id == $rapport->club_id_1)
                        {{ $c->name }}
                    @endif
                @endforeach
            </td>
        </tr>
        <tr>
            <td>الفريق الثاني</td>
            <td>
                @foreach($clubs as $c)
                    @if($c->id == $rapport->club_id_2)
                        {{ $c->name }}
                    @endif
                @endforeach
            </td>
        </tr>
    </table>
</body>
</html>