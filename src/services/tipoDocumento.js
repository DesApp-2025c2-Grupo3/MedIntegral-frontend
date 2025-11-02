import api from './api';

/**
 * Obtener todos los tipos de documentos
 */
export const getTiposDocumento = async () => {
  try {
    const { data } = await api.get('/tipoDocumentos');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener tipos de documentos:', err);
    throw err;
  }
};
