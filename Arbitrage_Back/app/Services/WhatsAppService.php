<?php

namespace App\Services;

use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class WhatsAppService
{
    protected $client;
    protected $adminWhatsAppNumber;

    public function __construct()
    {
        $this->client = new Client();
        // Numéro WhatsApp de l'administrateur
        $this->adminWhatsAppNumber = env('ADMIN_WHATSAPP_NUMBER', '+212681783861');
    }

    /**
     * Envoie une notification WhatsApp à l'administrateur concernant un nouvel utilisateur
     *
     * @param User $user L'utilisateur nouvellement enregistré
     * @return bool Indique si l'envoi a réussi
     */
    public function sendNewUserNotification(User $user)
    {
        try {
            $message = $this->formatNewUserMessage($user);

            // Version simplifiée - Log le message que nous enverrions
            Log::info("Message WhatsApp qui serait envoyé à {$this->adminWhatsAppNumber}: {$message}");

            // Pour une intégration réelle avec l'API WhatsApp Business
            // Décommentez ce code et configurez l'API
            /*
            $response = $this->client->post(env('WHATSAPP_API_URL'), [
                'headers' => [
                    'Authorization' => 'Bearer ' . env('WHATSAPP_API_TOKEN'),
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'messaging_product' => 'whatsapp',
                    'to' => $this->adminWhatsAppNumber,
                    'type' => 'template',
                    'template' => [
                        'name' => 'new_user_registration',
                        'language' => [
                            'code' => 'ar'
                        ],
                        'components' => [
                            [
                                'type' => 'body',
                                'parameters' => [
                                    ['type' => 'text', 'text' => $user->name],
                                    ['type' => 'text', 'text' => $user->email]
                                ]
                            ]
                        ]
                    ]
                ]
            ]);
            return $response->getStatusCode() === 200;
            */

            // Pour une approche simple - utilisation du service CallMeBot pour envoyer des messages WhatsApp
            // Plus d'info sur: https://www.callmebot.com/blog/free-api-whatsapp-messages/
            $encodedMessage = urlencode($message);
            $apiKey = env('CALLMEBOT_API_KEY', ''); // Récupérer l'API key depuis le fichier .env
            $webhookUrl = "https://api.callmebot.com/whatsapp.php?phone={$this->adminWhatsAppNumber}&text={$encodedMessage}&apikey={$apiKey}";
            
            // Log de l'URL du webhook (pour des raisons de débogage)
            Log::info("WhatsApp webhook URL:  {$webhookUrl}");
            
            // Si une API key est configurée, on envoie réellement le message
            if (!empty($apiKey)) {
                try {
                    $response = $this->client->get($webhookUrl);
                    return $response->getStatusCode() === 200;
                } catch (\Exception $e) {
                    Log::error("Erreur lors de l'envoi du message WhatsApp: " . $e->getMessage());
                    return false;
                }
            } else {
                Log::info("API key non configurée - Le message WhatsApp n'a pas été envoyé réellement");
            }

            return true;
        } catch (\Exception $e) {
            Log::error("Erreur lors de l\'envoi du message WhatsApp:  {$e->getMessage()} ");
            return false;
        }
    }

    /**
     * Formate le message WhatsApp pour un nouvel utilisateur
     *
     * @param User $user L'utilisateur nouvellement enregistré
     * @return string Le message formaté
     */
    protected function formatNewUserMessage(User $user)
    {
        return "🔔 *إشعار جديد من ArbiTre*\n\n".
               "تم تسجيل مستخدم جديد في منصة ArbiTre\n\n".
               "*معلومات المستخدم:*\n".
               "الاسم: {$user->name}\n".
               "البريد الإلكتروني: {$user->email}\n".
               "تاريخ التسجيل: " . $user->created_at->format('d/m/Y H:i') . "\n\n".
               "يرجى مراجعة حساب هذا المستخدم والتحقق من أنه حكم فعلاً.\n".
               "يمكنك الموافقة على حسابه أو رفضه من لوحة التحكم الخاصة بك.";
    }
}
