import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast, showInfoToast, showWarningToast } from '../Component/Utils/ToastProvider';
import { AuthUser } from '../AuthContext';

export const useStatusNotifications = () => {
  const navigate = useNavigate();
  const { handleStatusError } = AuthUser();

  // Fonction pour gérer les requêtes API avec notification de statut
  const handleApiRequest = useCallback(async (apiCall, options = {}) => {
    const { 
      onSuccess, 
      onError, 
      successMessage, 
      redirectOnSuccess,
      showSuccessNotification = true
    } = options;
    
    try {
      const response = await apiCall();
      
      // Afficher un message de succès si spécifié
      if (showSuccessNotification && successMessage) {
        showSuccessToast(successMessage);
      }
      
      // Exécuter le callback de succès si fourni
      if (onSuccess) {
        onSuccess(response);
      }
      
      // Rediriger si nécessaire
      if (redirectOnSuccess) {
        navigate(redirectOnSuccess);
      }
      
      return response;
    } catch (error) {
      // Vérifier si c'est une erreur liée au statut utilisateur
      const isStatusError = handleStatusError(error);
      
      // Si ce n'est pas une erreur de statut, afficher un message d'erreur générique
      if (!isStatusError && error.response) {
        showErrorToast(error.response.data?.message || "Une erreur s'est produite");
      }
      
      // Exécuter le callback d'erreur si fourni
      if (onError) {
        onError(error);
      }
      
      throw error;
    }
  }, [navigate, handleStatusError]);

  return {
    handleApiRequest,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast
  };
};
