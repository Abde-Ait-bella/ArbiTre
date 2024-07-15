import axios from "axios";

const axiosClinet = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? import.meta.env.VITE_BACKEND_URL_DEV : import.meta.env.VITE_BACKEND_URL,
    
})

axiosClinet.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token');
        if (token)
            config.headers.Authorization = `Bearer ${token}`;
        return config;
    }
  );

  axiosClinet.interceptors.response.use(null, function(error) {
    if (error.response.status === 401) {
        localStorage.removeItem('user');
        localStorage.removeItem('AUTHENTICATED')
        localStorage.removeItem('token')
        window.location.href = "/login";
    }
    
    return Promise.reject(error);
  });

export {axiosClinet};