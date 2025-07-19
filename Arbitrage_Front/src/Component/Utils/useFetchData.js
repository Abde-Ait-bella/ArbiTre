import { useState, useEffect } from 'react';
import { axiosClinet } from '../../Api/axios';
import { AuthUser } from '../../AuthContext';

export const useFetchData = (endpoint, dependencies = []) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = AuthUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axiosClinet.get(endpoint);
        const filteredData = response.data.filter(
          (item) => parseInt(item.user_id) === user?.id || item.user_id === null
        );
        
        setData(filteredData);
      } catch (err) {
        console.error(`Error fetching ${endpoint}:`, err);
        setError(err.response?.data?.message || 'خطأ في تحميل البيانات');
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      fetchData();
    }
  }, [endpoint, user?.id, ...dependencies]);

  return { data, loading, error, refetch: () => fetchData() };
};