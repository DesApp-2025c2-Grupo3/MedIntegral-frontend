import axios from 'axios';
import { prestadoresMock } from '../mocks/prestadores';
import { listaEspecialidadesMock } from '../mocks/listaEspecialidadesMock';
import { prestador1DetalleMock } from '../mocks/prestador1DetalleMock';
import { prestador2DetalleMock } from '../mocks/prestador2DetalleMock';
import { prestador3DetalleMock } from '../mocks/prestador3DetalleMock';
import { tipoDocumentoMock } from '../mocks/tipoDocumentoMock';
import { planesMedicos } from '../mocks/planesMedicosMock';
import { SituacionesTerapeuticasMock } from '../mocks/situacionesTerapeuticasMock';
import { parentescoMock } from '../mocks/parentescoMock';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (window.location.hostname === 'localhost') {
    if (config.url === '/prestadores' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: {
          id: crypto.randomUUID(),
          ...config.data,
        },
      });
    }

    if (config.url === '/afiliados' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: {
          id: crypto.randomUUID(),
          ...config.data,
        },
      });
    }

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
    if (config.url === '/agenda-turnos' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: {
          id: crypto.randomUUID(),
          ...config.data,
        },
      });
    }
    if (config.url === '/especialidades') {
      return Promise.reject({ isMock: true, data: listaEspecialidadesMock });
    }

    if (config.url === '/tipoDocumento') {
      return Promise.reject({ isMock: true, data: tipoDocumentoMock });
    }

    if (config.url === '/planesMedicos') {
      return Promise.reject({ isMock: true, data: planesMedicos });
    }

    if (config.url === '/situacionesTerapeuticas') {
      return Promise.reject({
        isMock: true,
        data: SituacionesTerapeuticasMock,
      });
    }

    if (config.url === '/parentescos') {
      return Promise.reject({ isMock: true, data: parentescoMock });
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
