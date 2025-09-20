import axios from 'axios';
import { prestadoresMock } from '../mocks/prestadores';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (window.location.hostname === 'localhost') {
    if (config.url === '/prestadores') {
      return Promise.reject({
        isMock: true,
        data: prestadoresMock,
      });
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) {
      return Promise.resolve({ data: error.data });
    }
    return Promise.reject(error);
  }
);

export default api;
