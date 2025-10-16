<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use App\Services\AdminNotificationService;

class AuthController extends Controller
{
    protected $adminNotificationService;

    public function __construct(AdminNotificationService $adminNotificationService)
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
        $this->adminNotificationService = $adminNotificationService;
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'These credentials do not match our records.',
            ], 403);
        }

        $user = Auth::user();
        
        // Enregistrer les informations sur l'appareil
        $this->logUserDevice($request, $user->id);
        
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'status' => 'pending', // Définir le statut initial à 'pending'
            'password' => Hash::make($request->password),
        ]);

        // Envoyer des notifications à l'administrateur
        $this->adminNotificationService->notifyAdminOfNewUser($user);

        Auth::login($user);
        $token = Auth::tokenById($user->id);
        
        return response()->json([
            'status' => 'success',
            'message' => 'تم انشاء الحساب',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
    
    /**
     * Récupérer le statut actuel de l'utilisateur authentifié
     * Cette méthode permet au frontend de vérifier si le statut de l'utilisateur a changé
     */
    public function getUserStatus()
    {
        $user = Auth::user();
        
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Utilisateur non authentifié',
            ], 401);
        }
        
        return response()->json([
            'status' => 'success',
            'user_status' => $user->status,
        ]);
    }

    /**
     * Enregistre les informations sur l'appareil de l'utilisateur
     * 
     * @param Request $request
     * @param int $userId
     * @return void
     */
    private function logUserDevice(Request $request, $userId)
    {
        try {
            $userAgent = $request->header('User-Agent');
            
            // Détection simple des appareils mobiles et tablettes
            $deviceType = 'desktop';
            if (preg_match('/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i', $userAgent) || preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i', substr($userAgent, 0, 4))) {
                $deviceType = 'mobile';
            } elseif (preg_match('/android|ipad|playbook|silk/i', $userAgent)) {
                $deviceType = 'tablet';
            }
            
            // Détection simple du navigateur
            $browser = 'unknown';
            if (preg_match('/MSIE|Trident/i', $userAgent)) {
                $browser = 'Internet Explorer';
            } elseif (preg_match('/Firefox/i', $userAgent)) {
                $browser = 'Firefox';
            } elseif (preg_match('/Chrome/i', $userAgent)) {
                $browser = 'Chrome';
            } elseif (preg_match('/Safari/i', $userAgent)) {
                $browser = 'Safari';
            } elseif (preg_match('/Opera|OPR/i', $userAgent)) {
                $browser = 'Opera';
            } elseif (preg_match('/Edge/i', $userAgent)) {
                $browser = 'Edge';
            }
            
            // Détection simple de la plateforme
            $platform = 'unknown';
            if (preg_match('/windows|win32|win64/i', $userAgent)) {
                $platform = 'Windows';
            } elseif (preg_match('/macintosh|mac os x/i', $userAgent)) {
                $platform = 'Mac';
            } elseif (preg_match('/linux/i', $userAgent)) {
                $platform = 'Linux';
            } elseif (preg_match('/android/i', $userAgent)) {
                $platform = 'Android';
            } elseif (preg_match('/iphone|ipad|ipod/i', $userAgent)) {
                $platform = 'iOS';
            }
            
            // Vérifier si la table user_logins existe avant d'insérer
            if (Schema::hasTable('user_logins')) {
                DB::table('user_logins')->insert([
                    'user_id' => $userId,
                    'device_type' => $deviceType,
                    'browser' => $browser,
                    'platform' => $platform,
                    'ip_address' => $request->ip(),
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
        } catch (\Exception $e) {
            // Journaliser l'erreur mais ne pas perturber le processus de connexion
            \Log::error('Erreur lors de l\'enregistrement des informations d\'appareil: ' . $e->getMessage());
        }
    }
}
