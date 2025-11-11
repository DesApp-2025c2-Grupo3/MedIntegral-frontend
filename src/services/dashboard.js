import api from './api';

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
