import { createContext, useContext, useState, useEffect } from "react";
import { showErrorToast, showInfoToast, showSuccessToast, showAccessDeniedToast } from "./Component/Utils/ToastProvider";
import { axiosClinet } from "./Api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(
        () => {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        }
    );
    
    // Fonction pour vérifier le statut de l'utilisateur avec le serveur
    const checkUserStatus = async () => {
        if (user && localStorage.getItem('token')) {
            try {
                const response = await axiosClinet.get('/user/status');
                
                if (response.data && response.data.user_status) {
                    // Mettre à jour le statut de l'utilisateur s'il a changé
                    if (user.status !== response.data.user_status) {
                        console.log("Statut utilisateur mis à jour:", response.data.user_status);
                        const updatedUser = { ...user, status: response.data.user_status };
                        setUser(updatedUser);
                        localStorage.setItem('user', JSON.stringify(updatedUser));
                        
                        // Si le statut a changé et n'est plus 'accepted', rediriger vers la page d'accueil
                        if (response.data.user_status !== 'accepted' && window.location.pathname.includes('/dashboard')) {
                            localStorage.setItem('ACCESS_DENIED_STATUS', response.data.user_status);
                            window.location.href = "/";
                            return;
                        }
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la vérification du statut utilisateur:", error);
                // Ne rien faire ici, car les intercepteurs s'en chargeront
            }
        }
    };
    
    // Effet pour vérifier le statut de l'utilisateur au chargement et à intervalles réguliers
    useEffect(() => {
        if (user) {
            // Vérifier immédiatement le statut
            checkUserStatus();
            
            // Vérifier le statut toutes les 5 minutes
            const statusCheckInterval = setInterval(() => {
                checkUserStatus();
            }, 5 * 60 * 1000); // 5 minutes
            
            // Nettoyer l'intervalle lors du démontage du composant
            return () => clearInterval(statusCheckInterval);
        }
    }, [user?.id]);
    
    // Effet pour afficher des notifications en fonction du statut de l'utilisateur
    useEffect(() => {
        if (user) {
            if (user.status === 'pending') {
                showInfoToast("Votre compte est en attente de validation par un administrateur.");
                
                // Rediriger vers la page d'accueil si l'utilisateur essaie d'accéder au tableau de bord
                if (window.location.pathname.includes('/dashboard')) {
                    localStorage.setItem('ACCESS_DENIED_STATUS', user.status);
                    window.location.href = "/";
                }
            } else if (user.status === 'rejected') {
                showErrorToast("Votre compte a été rejeté. Veuillez contacter un administrateur.");
                
                // Rediriger vers la page d'accueil si l'utilisateur essaie d'accéder au tableau de bord
                if (window.location.pathname.includes('/dashboard')) {
                    localStorage.setItem('ACCESS_DENIED_STATUS', user.status);
                    window.location.href = "/";
                }
            }
        }
    }, [user?.status]);
    
    const  [club_1, setClub_1] = useState(null);
    const  [club_2, setClub_2] = useState(null);
    const  [club_1_update, setClub_1_update] = useState(null);
    const  [club_2_update, setClub_2_update] = useState(null);

    const club_1_Option = (dataClub) => {
        setClub_1(dataClub)
    }

    const club_2_Option = (dataClub) => {
        setClub_2(dataClub)
    }

    const club_1_Option_update = (dataClub) => {
        setClub_1_update(dataClub)
    }

    const club_2_Option_update = (dataClub) => {
        setClub_2_update(dataClub)
    }

    const userDataLogin = (dataUser) => {
        setUser(dataUser)
        localStorage.setItem('user', JSON.stringify(dataUser));
    }

    const updateUserData = (updatedUserData) => {
        const updatedUser = { ...user, ...updatedUserData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    }

    const userDataLogout = () => {
        setUser(null)
        localStorage.removeItem('user');
        localStorage.removeItem('AUTHENTICATED');
        localStorage.removeItem('token');
        localStorage.removeItem('ACCESS_DENIED_STATUS');
        
        return true;
    }
    
    // Fonction pour gérer les erreurs 403 liées au statut utilisateur
    const handleStatusError = (error) => {
        if (error?.response?.status === 403 && error?.response?.data?.user_status) {
            // Utiliser notre notification personnalisée avec le bouton WhatsApp
            showAccessDeniedToast(error.response.data.user_status);
            return true;
        }
        return false;
    }

    return (
        <>
            <AuthContext.Provider value={{ 
                userDataLogin, 
                user, 
                userDataLogout, 
                updateUserData,
                club_1_Option, 
                club_2_Option, 
                club_1, 
                club_2, 
                club_1_Option_update, 
                club_2_Option_update, 
                club_1_update, 
                club_2_update,
                handleStatusError
            }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const AuthUser = () => {
    return useContext(AuthContext);
}