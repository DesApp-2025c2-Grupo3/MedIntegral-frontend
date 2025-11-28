import api from './api';

/**
 * Obtener todas las situaciones terapeuticas.
 */
export const getSituacionesTerapeuticas = async () => {
  try {
    const { data } = await api.get('/situaciones-terapeuticas');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener las situaciones terapeuticas:', err);
    throw err;
  }
};
