import { formatDireccion } from './formatDireccion';
import { formatHorarios } from './formatHorarios';
import { formatDias } from './formatDias';
import { formatFecha, formatHora } from './formatFechaHora';

export const formatAgendaTurnosDetalle = (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const horariosTexto = formatHorarios(data.horariosAtencion);
    const horariosAtencion = Array.isArray(data.horariosAtencion)
      ? data.horariosAtencion.map((h, idx) => ({
          dias: formatDias(h.dias),
          horarios: horariosTexto[idx] || '',
        }))
      : [];

    const prestador = data.prestador
      ? {
          id: data.prestador.id ?? null,
          nombre: data.prestador.nombre ?? '',
          especialidades: Array.isArray(data.prestador.especialidades)
            ? data.prestador.especialidades
            : [],
          horariosAtencion: Array.isArray(data.prestador.horariosAtencion)
            ? data.prestador.horariosAtencion.map((h) => ({
                dia: h.dia?.nombre ?? '',
                horaInicio: h.horaInicio ?? '',
                horaFin: h.horaFin ?? '',
              }))
            : [],
        }
      : null;

    return {
      id: data.id ?? null,
      prestador,
      especialidad: data.especialidad ?? '',
      direccion: formatDireccion(data.direccion),
      horariosAtencion,
      createdAtFecha: formatFecha(data.createdAt),
      createdAtHora: formatHora(data.createdAt),
      updatedAtFecha: formatFecha(data.updatedAt),
      updatedAtHora: formatHora(data.updatedAt),
    };
  } catch (err) {
    console.error('Error al formatear detalle de agenda:', err);

    return {
      id: null,
      prestador: {
        id: null,
        nombre: '',
        especialidades: [],
        horariosAtencion: [],
      },
      especialidad: '',
      direccion: '',
      horariosAtencion: [],
      createdAtFecha: '',
      createdAtHora: '',
      updatedAtFecha: '',
      updatedAtHora: '',
      error: true,
      errorMessage: err.message,
    };
  }
};
