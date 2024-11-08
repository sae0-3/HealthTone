import axios from 'axios';

// Configura el encabezado Authorization globalmente
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
