import api from './api';

/**
 * Obtener todos los tipos de planes medicos
 */
export const getPlanesMedicos = async () => {
  try {
    const { data } = await api.get('/planesMedicos');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener tipos de planes medicos:', err);
    throw err;
  }
};
