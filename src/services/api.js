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

const api = axios.create({
  baseURL: 'http://localhost:3002/api',
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

    if (config.url === '/prestadores' && config.method === 'get') {
      const filters = config.params || {};
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;
      const data = searchPrestadoresListadoMock(filters, page, limit);

      const itemsFormateados = data.items.map((p) => {
        const numeros = p.telefonos.map((t) => t.numero);
        const correos = p.emails.map((e) => e.direccion);
        const dirs = p.centrosDeAtencion.map(
          (d) => `${d.calle} ${d.altura || ''}, ${d.localidad}, ${d.provincia}`
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
        data: { ...data, items: itemsFormateados },
      });
    }

    for (const [url, fn] of Object.entries(afiliadosFiltrosMock)) {
      if (config.url.startsWith(url) && config.method === 'get') {
        const search = config.params?.textInputSearch || '';
        const data = fn(search);
        return Promise.reject({ isMock: true, data });
      }
    }

    if (config.url === '/afiliados' && config.method === 'get') {
      const filters = config.params || {};
      const page = Number(filters.page) || 1;
      const limit = Number(filters.limit) || 10;
      const data = searchAfiliadosMock(filters, page, limit);

      const itemsFormateados = data.items.map((a) => {
        const nombreCompleto = `${a.nombre} ${a.apellido}`;
        const tipoYDocumento = `${a.tipoDocumento.tipo} ${a.numeroDocumento}`;
        const dirs = a.direcciones.map(
          (d) =>
            `${d.calle} ${d.altura || ''}, ${d.localidad}, ${d.provincia.nombre}`
        );
        const numeros = a.telefonos.map((t) => t.numero);
        const correos = a.emails.map((t) => t.direccion);

        return {
          id: a.afiliado,
          afiliado: nombreCompleto,
          documento: tipoYDocumento,
          nroAfiliado: a.nroAfiliado,
          planMedico: a.cobertura.plan,
          direcciones: dirs,
          telefonos: numeros,
          emails: correos,
          vigenciaInicio: a.vigenciaInicio,
        };
      });

      return Promise.reject({
        isMock: true,
        data: { ...data, items: itemsFormateados },
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

    if (config.url === '/prestadores' && config.method === 'post') {
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

    if (config.url === '/agenda-turnos/prestadores')
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
    if (config.url === '/planesMedicos')
      return Promise.reject({ isMock: true, data: planesMedicos });
    if (config.url === '/situacionesTerapeuticas')
      return Promise.reject({
        isMock: true,
        data: SituacionesTerapeuticasMock,
      });
    if (config.url === '/parentescos')
      return Promise.reject({ isMock: true, data: parentescoMock });

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
    console.log('[MOCK] DELETE', config.url);
    return Promise.reject({
      isMock: true,
      data: null,
      status: 200,
    });
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
