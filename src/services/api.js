import axios from 'axios';
import { prestadoresMock } from '../mocks/prestadores';
import { prestador1DetalleMock } from '../mocks/prestador1DetalleMock';
import { prestador2DetalleMock } from '../mocks/prestador2DetalleMock';
import { prestador3DetalleMock } from '../mocks/prestador3DetalleMock';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (window.location.hostname === 'localhost') {
    if (config.url === '/prestadores') {
      return Promise.reject({ isMock: true, data: prestadoresMock });
    }
    if (config.url === '/prestadores/1') {
      return Promise.reject({ isMock: true, data: prestador1DetalleMock });
    }
    if (config.url === '/prestadores/2') {
      return Promise.reject({
        isMock: true,
        data: prestador2DetalleMock,
      });
    }
    if (config.url === '/prestadores/3') {
      return Promise.reject({
        isMock: true,
        data: prestador3DetalleMock,
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
