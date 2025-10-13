import api from './api';
import { formatAgendaTurnosListado } from '../utils/formats/agendaTurnosListado';

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
      dias: h.dias.map((d) => d.id),
      duracion: h.duracion,
      horaInicio: h.inicio?.format?.('HH:mm') ?? null,
      horaFin: h.fin?.format?.('HH:mm') ?? null,
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

/**
 * Obtener listado de agendas de turnos con filtros y paginación
 */
export const getAgendaTurnosListado = async (
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
    const { data } = await api.get('/agenda-turnos/listado', { params });
    return formatAgendaTurnosListado(data);
  } catch (err) {
    console.error('Error al obtener listado de agendas de turnos:', err);
    throw err;
  }
};
