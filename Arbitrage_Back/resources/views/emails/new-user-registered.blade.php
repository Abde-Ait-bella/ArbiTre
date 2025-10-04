<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvel utilisateur inscrit</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #fbab00;
            color: #fff;
            padding: 10px;
            text-align: center;
            border-radius: 5px 5px 0 0;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            color: #777;
        }
        .user-info {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .user-info p {
            margin: 5px 0;
        }
        .user-info strong {
            display: inline-block;
            width: 120px;
            font-weight: bold;
        }
        .action-required {
            background-color: #ffe0e0;
            border-left: 4px solid #ff5252;
            padding: 10px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ArbiTre - Nouvel Utilisateur Inscrit</h1>
        </div>
        
        <div class="content">
            <h2>Bonjour Administrateur,</h2>
            <p>Un nouvel utilisateur vient de s'inscrire sur la plateforme ArbiTre. Voici ses informations :</p>
            
            <div class="user-info">
                <p><strong>Nom :</strong> {{ $user->name }}</p>
                <p><strong>Email :</strong> {{ $user->email }}</p>
                <p><strong>Date d'inscription :</strong> {{ $user->created_at->format('d/m/Y à H:i') }}</p>
            </div>
            
            <div class="action-required">
                <p>Cet utilisateur est actuellement en statut "pending" et attend votre vérification. Veuillez vous connecter à votre tableau de bord pour examiner son compte.</p>
            </div>
            
            <p>Vous pouvez vous connecter au panneau d'administration pour vérifier et valider ce nouvel utilisateur.</p>
            
            <p>Cordialement,<br>L'équipe ArbiTre</p>
        </div>
        
        <div class="footer">
            <p>&copy; {{ date('Y') }} ArbiTre - Tous droits réservés</p>
        </div>
    </div>
</body>
</html>
