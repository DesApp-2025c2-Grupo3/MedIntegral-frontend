import api from './api';

/**
 * Obtener todos los parentescos.
 */
export const getParentescos = async () => {
  try {
    const { data } = await api.get('/parentescos');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener los parentescos:', err);
    throw err;
  }
};
