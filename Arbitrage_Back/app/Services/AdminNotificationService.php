<?php

namespace App\Services;

use App\Mail\NewUserRegistered;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class AdminNotificationService
{
    protected $whatsAppService;
    protected $adminEmail;

    public function __construct(WhatsAppService $whatsAppService)
    {
        $this->whatsAppService = $whatsAppService;
        $this->adminEmail = env('ADMIN_EMAIL', 'abdessamadaitbella98@gmail.com');
    }

    /**
     * Envoie toutes les notifications à l'administrateur pour un nouvel utilisateur
     *
     * @param User $user L'utilisateur nouvellement enregistré
     * @return void
     */
    public function notifyAdminOfNewUser(User $user)
    {
        $this->sendEmail($user);
        $this->sendWhatsAppMessage($user);
    }

    /**
     * Envoie un email à l'administrateur
     *
     * @param User $user L'utilisateur nouvellement enregistré
     * @return bool Indique si l'envoi a réussi
     */
    protected function sendEmail(User $user)
    {
        try {

            Mail::to($this->adminEmail)->send(new NewUserRegistered($user));

            Log::info("Email de notification envoyé à l'administrateur pour l'utilisateur: " . $user->email);
            return true;
        } catch (\Exception $e) {
            Log::error("Erreur lors de l'envoi de l'email de notification: " . $e->getMessage());
            return false;
        }
    }

    /**
     * Envoie un message WhatsApp à l'administrateur
     *
     * @param User $user L'utilisateur nouvellement enregistré
     * @return bool Indique si l'envoi a réussi
     */
    protected function sendWhatsAppMessage(User $user)
    {
        $result = $this->whatsAppService->sendNewUserNotification($user);
        if ($result) {
            Log::info("Message WhatsApp de notification envoyé à l'administrateur pour l'utilisateur: " . $user->email);
        }
        return $result;
    }
}
