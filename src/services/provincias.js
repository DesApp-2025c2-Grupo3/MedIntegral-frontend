import api from './api';

/**
 * Obtener todos las provincias
 */
export const getProvincias = async () => {
  try {
    const { data } = await api.get('/provincias');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener provincias:', err);
    throw err;
  }
};
