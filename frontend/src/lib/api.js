import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Allow cookies to be sent and received
});   
// Attach token only if withAuth === true
api.interceptors.request.use((config) => {
  if (config.withAuth) {
    const token = Cookies.get("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
export default api;