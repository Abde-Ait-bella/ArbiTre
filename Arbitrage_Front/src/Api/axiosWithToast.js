import axios from "axios";
import { showErrorToast, showAccessDeniedToast } from "../Component/Utils/ToastProvider";

const axiosClinet = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL,
});

axiosClinet.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
);

axiosClinet.interceptors.response.use(
    response => {
        return response;
    }, 
    error => {
        if (error.response) {
            // Gestion des erreurs 401 (non authentifié)
            if (error.response.status === 401) {
                localStorage.removeItem('user');
                localStorage.removeItem('AUTHENTICATED');
                localStorage.removeItem('token');
                window.location.href = "/login";
            }
            
            // Gestion des erreurs 403 (accès refusé) liées au statut utilisateur
            if (error.response.status === 403 && error.response.data && error.response.data.user_status) {
                // Utiliser notre nouvelle fonction d'affichage de notification avec bouton WhatsApp
                showAccessDeniedToast(error.response.data.user_status);
                
                // Rediriger vers la page d'accueil après un court délai
                setTimeout(() => {
                    // Conserver l'authentification mais rediriger vers la page d'accueil
                    // Nous allons stocker le statut pour afficher le message complet sur la page d'accueil
                    localStorage.setItem('ACCESS_DENIED_STATUS', error.response.data.user_status);
                    window.location.href = "/";
                }, 1000);
            }
        }
        
        return Promise.reject(error);
    }
);

export { axiosClinet };
