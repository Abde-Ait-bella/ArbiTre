// Exemple d'utilisation du hook useStatusNotifications
import React from 'react';
import { axiosClinet } from '../Api/axios';
import { useStatusNotifications } from '../hooks/useStatusNotifications';

const ExempleUtilisation = () => {
  const { handleApiRequest, showSuccessToast } = useStatusNotifications();

  const fetchProtectedResource = async () => {
    await handleApiRequest(
      () => axiosClinet.get('/some-protected-endpoint'),
      {
        successMessage: "Opération réussie !",
        redirectOnSuccess: '/dashboard/home',
        onSuccess: (response) => {
          console.log('Données récupérées :', response.data);
        },
        onError: (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      }
    );
  };

  const handleManualNotification = () => {
    showSuccessToast("Voici une notification manuelle !");
  };

  return (
    <div>
      <button onClick={fetchProtectedResource}>
        Récupérer ressource protégée
      </button>
      <button onClick={handleManualNotification}>
        Afficher notification manuelle
      </button>
    </div>
  );
};

export default ExempleUtilisation;
