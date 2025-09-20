import axios from 'axios';
import { prestadoresMock } from '../mocks/prestadores';
import { prestadorDetalleMock } from '../mocks/prestadorDetalle';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (window.location.hostname === 'localhost') {
    console.log(config.url);
    if (config.url === '/prestadores') {
      return Promise.reject({
        isMock: true,
        data: prestadoresMock,
      });
    }
    if (config.url?.startsWith('/prestadores/')) {
      console.log('interceptando fetch a prestador detalle');
      return Promise.reject({ isMock: true, data: prestadorDetalleMock });
    }
    console.log('no entró');
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
