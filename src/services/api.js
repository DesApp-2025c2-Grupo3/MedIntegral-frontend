import axios from 'axios';
import { prestadoresMock } from '../mocks/prestadores';
import { listaEspecialidadesMock } from '../mocks/listaEspecialidadesMock';
import { prestador1DetalleMock } from '../mocks/prestador1DetalleMock';
import { prestador2DetalleMock } from '../mocks/prestador2DetalleMock';
import { prestador3DetalleMock } from '../mocks/prestador3DetalleMock';
import { tipoDocumentoMock } from '../mocks/tipoDocumentoMock';
import {
  agendaTurnosFiltrosMocks,
  searchAgendaTurnosMock,
} from '../mocks/agendaTurnosListadoMock';
import {
  searchPrestadoresListadoMock,
  prestadoresFiltrosMock,
} from '../mocks/prestadoresListadoMock';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  if (window.location.hostname === 'localhost') {
    for (const [url, fn] of Object.entries(agendaTurnosFiltrosMocks)) {
      if (config.url.startsWith(url) && config.method === 'get') {
        const search = config.params?.textInputSearch || '';
        const data = fn(search);
        return Promise.reject({ isMock: true, data });
      }
    }

    if (config.url.startsWith('/agenda-turnos') && config.method === 'get') {
      const filters = config.params || {};
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;

      const data = searchAgendaTurnosMock(filters, page, limit);

      const itemsFormateados = data.items.map((a) => {
        const dir = a.direccion
          ? `${a.direccion.calle} ${a.direccion.altura || ''}${
              a.direccion.pisoDepto ? ', ' + a.direccion.pisoDepto : ''
            }, ${a.direccion.localidad}, ${a.direccion.provincia}`
          : '';

        const horarios =
          a.horarioAtencion?.map(
            (h) =>
              `${h.dia.join(', ')} - ${h.horarioInicio}hs a ${h.horarioFin}hs`
          ) || [];

        return {
          id: a.id,
          prestador: a.prestador,
          especialidad: a.especialidad,
          horarios,
          direccion: dir,
          duracion: `${a.duracion} minutos`,
        };
      });

      return Promise.reject({
        isMock: true,
        data: {
          ...data,
          items: itemsFormateados,
        },
      });
    }

    for (const [url, fn] of Object.entries(prestadoresFiltrosMock)) {
      if (config.url.startsWith(url) && config.method === 'get') {
        const search = config.params?.textInputSearch || '';
        const data = fn(search);
        return Promise.reject({ isMock: true, data });
      }

      if (config.url.startsWith('/prestadores') && config.method === 'get') {
        const filters = config.params || {};
        const page = Number(filters.page) || 1;
        const limit = Number(filters.limit) || 10;

        const data = searchPrestadoresListadoMock(filters, page, limit);

        const itemsFormateados = data.items.map((p) => {
          const numeros = p.telefonos.map((t) => t.numero);
          const correos = p.emails.map((e) => e.direccion);
          const dirs = p.centrosDeAtencion.map(
            (d) =>
              `${d.calle} ${d.altura || ''}, ${d.localidad}, ${d.provincia}`
          );

          return {
            id: p.id,
            nombre: p.nombre,
            cuilCuit: p.cuilCuit,
            esCentroMedico: p.esCentroMedico,
            especialidades: p.especialidades,
            direcciones: dirs,
            telefonos: numeros,
            emails: correos,
            createdAt: p.createdAt,
          };
        });
        return Promise.reject({
          isMock: true,
          data: {
            ...data,
            items: itemsFormateados,
          },
        });
      }
    }

    if (config.url === '/agenda-turnos' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }

    if (config.url === '/prestadores' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }

    if (config.url === '/prestadores')
      return Promise.reject({ isMock: true, data: prestadoresMock });
    if (config.url === '/prestadores/1')
      return Promise.reject({ isMock: true, data: prestador1DetalleMock });
    if (config.url === '/prestadores/2')
      return Promise.reject({ isMock: true, data: prestador2DetalleMock });
    if (config.url === '/prestadores/3')
      return Promise.reject({ isMock: true, data: prestador3DetalleMock });

    if (config.url === '/especialidades')
      return Promise.reject({ isMock: true, data: listaEspecialidadesMock });
    if (config.url === '/tipoDocumento')
      return Promise.reject({ isMock: true, data: tipoDocumentoMock });

    if (config.url === '/afiliados' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) return Promise.resolve({ data: error.data });
    return Promise.reject(error);
  }
);

export default api;
