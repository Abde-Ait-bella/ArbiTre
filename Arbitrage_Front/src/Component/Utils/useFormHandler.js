import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { axiosClinet } from '../../Api/axios';
import { AuthUser } from '../../AuthContext';
import { getErrorMessage } from './errorMessages';

export const useFormHandler = (schema, endpoint, successRoute, transformData = null) => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const { user } = AuthUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    clearErrors,
    setError
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setSubmitError('');

    try {
      // Validation supplémentaire côté client pour les joueurs
      if (data.joueur_numero && (isNaN(data.joueur_numero) || data.joueur_numero < 1 || data.joueur_numero > 99)) {
        setError('joueur_numero', {
          type: 'manual',
          message: 'يجب أن يكون رقم اللاعب بين 1 و 99'
        });
        setLoading(false);
        return;
      }

      // Nettoyage et préparation des données
      let finalData = { 
        ...data, 
        user_id: parseInt(user?.id)
      };

      // Nettoyage spécifique pour les joueurs
      if (data.nom) {
        finalData.nom = data.nom.trim().substring(0, 30);
      }
      if (data.joueur_numero_licence) {
        finalData.joueur_numero_licence = data.joueur_numero_licence.trim().substring(0, 15);
      }

      if (transformData) {
        finalData = transformData(finalData);
      }

      console.log('Sending data:', finalData); // Pour debug

      const response = await axiosClinet.post(endpoint, finalData);
      
      if (response.data.status === true || response.status === 200 || response.status === 201) {
        reset();
        navigate(successRoute);
      } else {
        throw new Error('فشل في الإضافة');
      }
    } catch (error) {
      // Utiliser la fonction pour obtenir un message générique
      const errorMessage = getErrorMessage(error);
      setSubmitError(errorMessage);
      
      // Log détaillé seulement en développement
      if (process.env.NODE_ENV === 'development') {
        console.error('Detailed error for debugging:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    submitError,
    reset,
    setValue,
    watch,
    clearErrors,
    setError
  };
};