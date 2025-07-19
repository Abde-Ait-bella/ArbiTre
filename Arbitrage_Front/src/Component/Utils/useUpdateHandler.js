import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import { axiosClinet } from '../../Api/axios';
import { getErrorMessage } from './errorMessages';

export const useUpdateHandler = (schema, endpoint, successRoute, fetchEndpoint = null) => {
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

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

  // Récupération des données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClinet.get(fetchEndpoint || endpoint);
        const data = response.data.find(item => item.id === parseInt(id));
        
        if (data) {
          setInitialData(data);
          // Pré-remplir le formulaire avec les données existantes
          Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'created_at' && key !== 'updated_at') {
              setValue(key, data[key]);
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setSubmitError('خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, endpoint, fetchEndpoint, setValue]);

  const onSubmit = async (data) => {
    setSubmitLoading(true);
    setSubmitError('');

    try {
      // Validation supplémentaire côté client
      if (data.joueur_numero && (isNaN(data.joueur_numero) || data.joueur_numero < 1 || data.joueur_numero > 99)) {
        setError('joueur_numero', {
          type: 'manual',
          message: 'يجب أن يكون رقم اللاعب بين 1 و 99'
        });
        setSubmitLoading(false);
        return;
      }

      // Nettoyage et préparation des données
      let finalData = { ...data };

      // Nettoyage spécifique pour certains types
      if (data.nom) {
        finalData.nom = data.nom.trim().substring(0, 50);
      }
      if (data.joueur_numero_licence) {
        finalData.joueur_numero_licence = data.joueur_numero_licence.trim().substring(0, 15);
      }
      if (data.abbr) {
        finalData.abbr = data.abbr.trim().toUpperCase().substring(0, 10);
      }

      console.log('Updating data:', finalData); // Pour debug

      const response = await axiosClinet.put(`${endpoint}/${id}`, finalData);
      
      if (response.status === 200) {
        reset();
        navigate(successRoute);
      } else {
        throw new Error('فشل في التعديل');
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setSubmitError(errorMessage);
      
      // Log détaillé seulement en développement
      if (process.env.NODE_ENV === 'development') {
        console.error('Detailed error for debugging:', error);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    submitLoading,
    submitError,
    initialData,
    reset,
    setValue,
    watch,
    clearErrors,
    setError
  };
};