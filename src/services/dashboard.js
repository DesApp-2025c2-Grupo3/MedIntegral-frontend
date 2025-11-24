import api from './api';
import { getDireccionFormateada } from '../utils/formats/formatDireccion';

/**
 * Obtener cantidad total de afiliados
 */
export const getAfiliadosTotales = async () => {
  try {
    const { data } = await api.get('/dashboard/afiliados-totales');
    if (typeof data !== 'number') {
      throw new Error('Formato inesperado en la respuesta de afiliados');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener afiliados totales:', err);
    throw err;
  }
};

/**
 * Obtener cantidad total de prestadores
 */
export const getPrestadoresTotales = async () => {
  try {
    const { data } = await api.get('/dashboard/prestadores-totales');
    if (typeof data !== 'number') {
      throw new Error('Formato inesperado en la respuesta de prestadores');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener prestadores totales:', err);
    throw err;
  }
};

/**
 * Obtener cantidad total de agendas de turnos
 */
export const getAgendasTotales = async () => {
  try {
    const { data } = await api.get('/dashboard/agendas-totales');
    if (typeof data !== 'number') {
      throw new Error('Formato inesperado en la respuesta de agendas');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener agendas totales:', err);
    throw err;
  }
};

/**
 * Obtener cantidad total de especialidades
 */
export const getCantidadEspecialidades = async () => {
  try {
    const { data } = await api.get('/dashboard/cantidad-especialidades');
    if (typeof data !== 'number') {
      throw new Error('Formato inesperado en la respuesta de especialidades');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener cantidad de especialidades:', err);
    throw err;
  }
};

/**
 * Obtener prestadores agrupados por localidad
 * Devuelve: [{ localidad: string, provincia: string, cantidad: number }]
 */
export const getPrestadoresPorLocalidad = async () => {
  try {
    const { data } = await api.get('/dashboard/prestadores-por-localidad');

    if (!Array.isArray(data)) {
      throw new Error('Formato de respuesta inesperado');
    }

    return data.map((item) => ({
      localidad: item.localidad ?? 'Sin localidad',
      provincia: item.provincia ?? '',
      cantidad: Number(item.cantidad) || 0,
    }));
  } catch (err) {
    console.error('Error al obtener prestadores por localidad:', err);
    throw err;
  }
};
/**
 * Obtener prestadores agrupados por especialidad
 * Devuelve: [{ nombre: string, cantidad: number }]
 */
export const getPrestadoresPorEspecialidad = async () => {
  try {
    const { data } = await api.get('/dashboard/prestadores-por-especialidad');

    if (!Array.isArray(data)) {
      throw new Error('Formato de respuesta inesperado');
    }

    return data.map((item) => ({
      nombre: item.nombre ?? 'Sin especialidad',
      cantidad: Number(item.cantidad) || 0,
    }));
  } catch (err) {
    console.error('Error al obtener prestadores por especialidad:', err);
    throw err;
  }
};

export const getAfiliadosConBaja = async () => {
  try {
    const { data } = await api.get('/dashboard/afiliados-con-baja');
    if (!Array.isArray(data)) throw new Error('Formato inesperado');

    return data.map((a) => ({
      id: a.id,
      nombre: a.nombre ?? 'Sin nombre',
      fecha: a.vigenciaHasta
        ? new Date(a.vigenciaHasta).toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
        : '-',
    }));
  } catch (err) {
    console.error('Error al obtener afiliados con baja:', err);
    return [];
  }
};

export const getPrestadoresSinAgenda = async () => {
  try {
    const { data } = await api.get('/dashboard/prestadores-sin-agenda');

    if (!Array.isArray(data)) throw new Error('Formato inesperado');

    return data.map((p) => ({
      id: p.id,
      nombre: p.nombre ?? 'Sin nombre',

      especialidades: Array.isArray(p.especialidades)
        ? p.especialidades.map((e) => e.nombre)
        : [],

      direcciones: Array.isArray(p.Direccion)
        ? p.Direccion.map((d) => getDireccionFormateada(d))
        : [],
    }));
  } catch (err) {
    console.error('Error al obtener prestadores sin agenda:', err);
    return [];
  }
};

export const getPlanesMedicosPorMes = async () => {
  try {
    const { data } = await api.get('/dashboard/planes-medicos-por-mes');
    if (!Array.isArray(data)) throw new Error('Formato inesperado');

    return data.map((d) => ({
      mes: d.mes ?? 'Sin mes',
      planes: typeof d.planes === 'object' ? d.planes : {},
    }));
  } catch (err) {
    console.error('Error al obtener planes médicos por mes:', err);
    return [];
  }
};
