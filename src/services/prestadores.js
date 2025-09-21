import api from './api';

/**
 * Obtener todos los prestadores
 */
export const getPrestadores = async () => {
  try {
    const { data } = await api.get('/prestadores');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta de prestadores');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener prestadores:', err);
    throw err;
  }
};

/**
 * Obtener un prestador por ID
 */
export const getPrestadorById = async (id) => {
  if (!id) {
    throw new Error('Se requiere un ID de prestador');
  }

  try {
    const { data } = await api.get(`/prestadores/${id}`);
    if (!data || typeof data !== 'object') {
      throw new Error(
        `Prestador con ID ${id} no encontrado o formato inválido`
      );
    }
    return data;
  } catch (err) {
    console.error(`Error al obtener prestador con ID ${id}:`, err);
    throw err;
  }
};
