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

// Hook pour gérer les suppressions
export const useDeleteItem = (endpoint, redirectPath) => {
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            setLoadingDelete(true);
            setItemIdToDelete(id);
            
            const response = await axiosClinet.delete(`${endpoint}/${id}`);
            
            if (response.status === 200) {
                if (redirectPath) {
                    navigate(redirectPath);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error(`Error deleting item with id ${id}:`, error);
            return false;
        } finally {
            setLoadingDelete(false);
            setItemIdToDelete(null);
        }
    };

    return { handleDelete, loadingDelete, itemIdToDelete };
};