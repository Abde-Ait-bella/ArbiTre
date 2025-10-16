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

  axiosClinet.interceptors.response.use(
    // Intercepteur pour les réponses réussies
    function(response) {
      // Vérifier si la réponse contient des informations utilisateur et mettre à jour le statut si nécessaire
      if (response.data && response.data.user) {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        
        // Si le statut a changé, mettre à jour le localStorage
        if (currentUser.id === response.data.user.id && currentUser.status !== response.data.user.status) {
          const updatedUser = {
            ...currentUser,
            status: response.data.user.status
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          
          // Si le statut n'est plus 'accepted', rediriger vers la page d'accueil
          if (response.data.user.status !== 'accepted' && window.location.pathname.includes('/dashboard')) {
            localStorage.setItem('ACCESS_DENIED_STATUS', response.data.user.status);
            window.location.href = "/";
          }
        }
      }
      
      return response;
    },
    
    // Intercepteur pour les erreurs
    function(error) {
      if (error.response) {
        // Gestion des erreurs 401 (non authentifié)
        if (error.response.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('AUTHENTICATED');
          localStorage.removeItem('token');
          window.location.href = "/login";
        }
        
        // Ajout de la vérification du statut utilisateur dans les erreurs 403
        if (error.response.status === 403 && error.response.data && error.response.data.user_status) {
          // Mettre à jour le statut dans localStorage
          const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
          if (currentUser.id) {
            const updatedUser = {
              ...currentUser,
              status: error.response.data.user_status
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            localStorage.setItem('ACCESS_DENIED_STATUS', error.response.data.user_status);
            
            // Rediriger vers la page d'accueil si on est dans le dashboard
            if (window.location.pathname.includes('/dashboard')) {
              window.location.href = "/";
            }
          }
        }
      }
      
      return Promise.reject(error);
    }
  );

export {axiosClinet};