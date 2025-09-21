import api from './api';

/**
 * Crear una nueva agenda de turnos
 */
export const createAgendaTurnos = async ({
  prestador,
  especialidad,
  direccion,
  horarios,
}) => {
  if (!prestador?.id || !especialidad?.id || !direccion?.id) {
    throw new Error('Faltan IDs obligatorios para crear la agenda de turnos');
  }

  const payload = {
    prestadorId: prestador.id,
    especialidadId: especialidad.id,
    direccionId: direccion.id,
    horarios: horarios.map((h) => ({
      dias: h.dias,
      duracion: h.duracion,
      inicio: h.inicio?.format?.('HH:mm'),
      fin: h.fin?.format?.('HH:mm'),
    })),
  };

  try {
    const { data } = await api.post('/agenda-turnos', payload);

    if (!data?.id) {
      throw new Error(
        'La respuesta del servidor no incluye el ID de la agenda creada'
      );
    }

    return data;
  } catch (err) {
    console.error('Error al crear la agenda de turnos:', err);
    throw err;
  }
};
