import api from './api';

export const getCentrosMedicos = async () => {
  try {
    const { data } = await api.get('/prestadores/centros-medicos');
    if (!Array.isArray(data)) {
      throw new Error('Formato inesperado en la respuesta de centros medicos');
    }
    return data;
  } catch (err) {
    console.error('Error al obtener centros medicos:', err);
    throw err;
  }
};
