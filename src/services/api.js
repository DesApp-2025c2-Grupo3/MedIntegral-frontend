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
import {
  agendaTurnosFiltrosMocks,
  searchAgendaTurnosMock,
} from '../mocks/agendaTurnosListadoMock';
import {
  searchPrestadoresListadoMock,
  prestadoresFiltrosMock,
} from '../mocks/prestadoresListadoMock';
import {
  afiliadosFiltrosMock,
  searchAfiliadosMock,
} from '../mocks/afiliadosListadoMock';
import { agendaTurnosMock } from '../mocks/agendaTurnosMock';

const USE_AGENDA_TURNOS_MOCKS = true;
const USE_PRESTADORES_MOCKS = true;
const USE_AFILIADOS_MOCKS = false;

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

    if (
      config.url.startsWith('/agenda-turnos/listado') &&
      config.method === 'get' &&
      USE_AGENDA_TURNOS_MOCKS
    ) {
      const filters = config.params || {};
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;

      const data = searchAgendaTurnosMock(filters, page, limit);

      return Promise.reject({ isMock: true, data });
    }

    for (const [url, fn] of Object.entries(prestadoresFiltrosMock)) {
      if (config.url.startsWith(url) && config.method === 'get') {
        const search = config.params?.textInputSearch || '';
        const data = fn(search);
        return Promise.reject({ isMock: true, data });
      }
    }

    if (
      config.url.startsWith('/prestadores/listado') &&
      config.method === 'get' &&
      USE_PRESTADORES_MOCKS
    ) {
      const filters = config.params || {};
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;
      const data = searchPrestadoresListadoMock(filters, page, limit);

      return Promise.reject({
        isMock: true,
        data: data,
      });
    }

    for (const [url, fn] of Object.entries(afiliadosFiltrosMock)) {
      if (config.url.startsWith(url) && config.method === 'get') {
        const search = config.params?.textInputSearch || '';
        const data = fn(search);
        return Promise.reject({ isMock: true, data });
      }
    }

    if (
      config.url == '/afiliados' &&
      config.method === 'get' &&
      USE_AFILIADOS_MOCKS
    ) {
      const filters = config.params || {};
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;
      const data = searchAfiliadosMock(filters, page, limit);
      const itemsParaFormatear = data.items.map((a) => ({
        id: a.afiliado,
        nombre: a.nombre,
        apellido: a.apellido,
        numeroDocumento: a.numeroDocumento,
        tipoDocumento: a.tipoDocumento,
        Contrato: {
          nAfiliado: a.nroAfiliado ? parseInt(a.nroAfiliado.split('-')[0]) : 1,
          plan: {
            plan: a.cobertura.plan,
          },
        },
        domicilios: a.direcciones.map((d) => ({
          Direccion: {
            calle: d.calle,
            altura: d.altura,
            pisoDepto: '',
            localidad: d.localidad,
            Provincium: {
              nombre: d.provincia.nombre,
            },
            codigoPostal: d.codigoPostal,
          },
        })),
        emails: a.emails,
        telefonos: a.telefonos,
      }));

      return Promise.reject({
        isMock: true,
        data: itemsParaFormatear,
      });
    }

    if (
      config.url === '/agenda-turnos' &&
      config.method === 'post' &&
      USE_AGENDA_TURNOS_MOCKS
    ) {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }

    if (
      USE_PRESTADORES_MOCKS &&
      config.url === '/prestadores' &&
      config.method === 'post'
    ) {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }

    if (config.url === '/afiliados' && config.method === 'post') {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }

    if (config.url === '/prestadores/sin-agenda' && USE_AGENDA_TURNOS_MOCKS)
      return Promise.reject({ isMock: true, data: prestadoresMock });

    if (config.url === '/prestadores/1' && USE_AGENDA_TURNOS_MOCKS)
      return Promise.reject({ isMock: true, data: prestador1DetalleMock });
    if (config.url === '/prestadores/2' && USE_AGENDA_TURNOS_MOCKS)
      return Promise.reject({ isMock: true, data: prestador2DetalleMock });
    if (config.url === '/prestadores/3' && USE_AGENDA_TURNOS_MOCKS)
      return Promise.reject({ isMock: true, data: prestador3DetalleMock });

    if (USE_AGENDA_TURNOS_MOCKS && config.url === '/especialidades')
      return Promise.reject({ isMock: true, data: listaEspecialidadesMock });

    if (config.url === '/tipoDocumento' && USE_AFILIADOS_MOCKS)
      return Promise.reject({ isMock: true, data: tipoDocumentoMock });

    if (
      config.url === '/afiliados' &&
      config.method === 'post' &&
      USE_AFILIADOS_MOCKS
    ) {
      return Promise.reject({
        isMock: true,
        data: { id: crypto.randomUUID(), ...config.data },
      });
    }

    if (config.url === '/planesMedicos' && USE_AFILIADOS_MOCKS) {
      return Promise.reject({ isMock: true, data: planesMedicos });
    }

    if (config.url === '/situacionesTerapeuticas' && USE_AFILIADOS_MOCKS) {
      return Promise.reject({
        isMock: true,
        data: SituacionesTerapeuticasMock,
      });
    }

    if (config.url === '/parentescos' && USE_AFILIADOS_MOCKS) {
      return Promise.reject({ isMock: true, data: parentescoMock });
    }

    if (
      config.url.startsWith('/agenda-turnos/1') &&
      config.method === 'get' &&
      USE_AGENDA_TURNOS_MOCKS
    ) {
      return Promise.reject({ isMock: true, data: agendaTurnosMock });
    }

    if (
      /^\/agenda-turnos\/\d+\/especialidades$/.test(config.url) &&
      config.method === 'put' &&
      USE_AGENDA_TURNOS_MOCKS
    ) {
      const body =
        typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const { especialidadId } = body || {};

      const updatedAgenda = { ...agendaTurnosMock };
      const nuevaEspecialidad =
        updatedAgenda.prestador.especialidades.find(
          (e) => e.id === especialidadId
        ) || updatedAgenda.especialidad;

      updatedAgenda.especialidad = nuevaEspecialidad;
      updatedAgenda.updatedAt = new Date().toISOString();

      return Promise.reject({
        isMock: true,
        data: updatedAgenda,
        status: 200,
      });
    }

    if (
      /^\/agenda-turnos\/\d+\/horarios$/.test(config.url) &&
      config.method === 'put' &&
      USE_AGENDA_TURNOS_MOCKS
    ) {
      const body =
        typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
      const { horariosAtencion } = body || {};

      const updatedAgenda = { ...agendaTurnosMock };

      updatedAgenda.horariosAtencion = Array.isArray(horariosAtencion)
        ? horariosAtencion
        : updatedAgenda.horariosAtencion;

      updatedAgenda.updatedAt = new Date().toISOString();

      return Promise.reject({
        isMock: true,
        data: updatedAgenda,
        status: 200,
      });
    }

    if (
      /^\/agenda-turnos\/\d+$/.test(config.url) &&
      config.method === 'delete' &&
      USE_AGENDA_TURNOS_MOCKS
    ) {
      return Promise.reject({
        isMock: true,
        data: null,
        status: 200,
      });
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isMock) {
      return Promise.resolve({
        data: error.data,
        status: error.status ?? 200,
      });
    }
    return Promise.reject(error);
  }
);

export default api;
