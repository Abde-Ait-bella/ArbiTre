import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosClinet } from '../../Api/axios';
import { AuthUser } from '../../AuthContext';

// Hook pour charger des données avec gestion d'état
export const useDataFetching = (endpoint, filterFn = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = AuthUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axiosClinet.get(endpoint);
                
                // Appliquer le filtre si fourni, sinon prendre toutes les données
                let filteredData = response.data;
                if (filterFn) {
                    filteredData = filterFn(response.data, user);
                }
                
                setData(filteredData);
                setError(null);
            } catch (err) {
                setError(`Erreur lors du chargement des données: ${err.message}`);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, user]);

    return { data, setData, loading, error };
};


export const useDeleteItem = (endpoint, redirectPath = null) => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        setItemIdToDelete(id);
        setLoadingDelete(true);

        try {
            // Activer l'appel API réel
            await axiosClinet.delete(`${endpoint}/${id}`);
            
            
            // Redirection si nécessaire
            if (redirectPath) {
                navigate(redirectPath);
            }
            
            return true;
        } catch (error) {
            console.error(`❌ Erreur suppression ID ${id}:`, error);
            alert('فشل في حذف العنصر');
            return false;
        } finally {
            setLoadingDelete(false);
            setItemIdToDelete(null);
        }
    };

    return { handleDelete, loadingDelete, itemIdToDelete };
};
