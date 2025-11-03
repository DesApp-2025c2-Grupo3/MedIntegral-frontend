import api from './api';
import { formatPrestadoresListado } from '../utils/formats/prestadoresListado';
import { formatPrestadorDetalle } from '../utils/formats/prestadoresDetalle';

/**
 * Obtener todos los prestadores
 */
export const getPrestadoresListado = async (
  filters = {},
  page = 0,
  limit = 10
) => {
  const params = Object.fromEntries(
    Object.entries({
      ...filters,
      page: page + 1,
      limit,
    }).map(([key, val]) => [
      key,
      typeof val === 'object' ? val?.value || '' : val,
    ])
  );

  try {
    const { data } = await api.get('/prestadores/listado', { params });
    return formatPrestadoresListado(data);
  } catch (err) {
    console.error('Error al obtener listado de prestadores:', err);
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

    const formatted = formatPrestadorDetalle(data);
    return formatted;
  } catch (err) {
    console.error(`Error al obtener prestador con ID ${id}:`, err);
    throw err;
  }
};

/**
 * Crear un nuevo prestador
 */

export const createPrestador = async (prestadorData) => {
  if (!prestadorData?.nombre || !prestadorData?.cuilCuit) {
    throw new Error('Faltan datos obligatorios para crear el prestador');
  }

  const payload = {
    ...prestadorData,
  };

  try {
    const { data } = await api.post('/prestadores', payload);

    if (!data?.id) {
      throw new Error(
        'La respuesta del servidor no incluye el ID del prestador creado'
      );
    }

    return data;
  } catch (err) {
    console.error('Error al crear el prestador:', err);
    throw err;
  }
};

/**
 * Eliminar un prestador
 */
export const deletePrestadorById = (id) => api.delete(`/prestadores/${id}`);
