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

/** 
 * Crear un nuevo prestador
 */

export const createPrestador = async (prestadorData) => {
  if(!prestadorData?.nombre || !prestadorData?.cuilCuit){
    throw new Error('Faltan datos obligatorios para crear el prestador')
  }

  const payload = {
    ...prestadorData
  }

  try {
    const { data } = await api.post('/prestadores', payload);

    if(!data?.id){
      throw new Error(
        'La respuesta del servidor no incluye el ID del prestador creado'
      );
    }

    return data;
  } catch (err){
    console.error('Error al crear el prestador:', err);
    throw err;
  }
};


