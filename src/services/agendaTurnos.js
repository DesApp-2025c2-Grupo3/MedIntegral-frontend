import api from './api';
import { formatAgendaTurnosListado } from '../utils/formats/agendaTurnosListado';
import { formatAgendaTurnosDetalle } from '../utils/formats/agendaTurnosDetalle';
import { formatAgendaTurnosPrestador } from '../utils/formats/agendaTurnosPrestador';

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
    lugaratencionId: direccion.id,
    horarios: horarios.map((h) => ({
      dias: h.dias.map((d) => d.nombre),
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

/**
 * Obtener los prestadores para agenda de turnos
 */
export const getPrestadores = async () => {
  try {
    const { data } = await api.get(
      '/agenda-turnos/prestadores-con-agenda-incompleta'
    );
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
    const formatted = formatAgendaTurnosPrestador(data);
    return formatted;
  } catch (err) {
    console.error(`Error al obtener prestador con ID ${id}:`, err);
    throw err;
  }
};

/**
 * Obtener detalle de una agenda de turnos por ID
 */
export const getAgendaTurnoById = async (id) => {
  if (!id) {
    throw new Error('Se requiere un ID de agenda de turnos');
  }

  try {
    const { data } = await api.get(`/agenda-turnos/${id}`);

    if (!data || typeof data !== 'object') {
      throw new Error(
        `Agenda de turnos con ID ${id} no encontrada o formato inválido`
      );
    }

    const formatted = formatAgendaTurnosDetalle(data);
    return formatted;
  } catch (err) {
    console.error(`Error al obtener detalle de agenda con ID ${id}:`, err);
    throw err;
  }
};

/**
 * Actualizar la especialidad de una agenda de turnos existente
 */
export const updateAgendaEspecialidad = async (id, especialidadId) => {
  try {
    const response = await api.put(`/agenda-turnos/${id}/especialidades`, {
      especialidadId,
    });

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar la especialidad (status ${response.status})`
      );
    }

    const formatted = formatAgendaTurnosDetalle(response.data);
    return formatted;
  } catch (error) {
    console.error(
      `Error al actualizar la especialidad de la agenda ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Actualizar los horarios de atención de una agenda de turnos existente
 */
export const updateAgendaHorarios = async (id, horarios) => {
  try {
    const response = await api.put(`/agenda-turnos/${id}/horarios`, {
      horarios,
    });

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar la especialidad (status ${response.status})`
      );
    }

    const formatted = formatAgendaTurnosDetalle(response.data);
    return formatted;
  } catch (error) {
    console.error(
      `Error al actualizar los horarios de la agenda ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Eliminar una agenda de turnos
 */
export const deleteAgendaTurnos = (id) => api.delete(`/agenda-turnos/${id}`);
