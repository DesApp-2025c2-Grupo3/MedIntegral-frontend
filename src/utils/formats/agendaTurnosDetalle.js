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

    return {
      id: data.id ?? null,
      prestador:
        typeof data.prestador === 'object'
          ? (data.prestador.nombre ?? '')
          : (data.prestador ?? ''),
      especialidad:
        typeof data.especialidad === 'object'
          ? (data.especialidad.nombre ?? '')
          : (data.especialidad ?? ''),
      direccion: formatDireccion(data.direccion),
      horariosAtencion,
      duracion: data.duracion ?? null,
      createdAtFecha: formatFecha(data.createdAt),
      createdAtHora: formatHora(data.createdAt),
      updatedAtFecha: formatFecha(data.updatedAt),
      updatedAtHora: formatHora(data.updatedAt),
    };
  } catch (err) {
    console.error('Error al formatear detalle de agenda:', err);
    return {
      id: null,
      prestador: '',
      especialidad: '',
      direccion: '',
      horariosAtencion: [],
      duracion: null,
      createdAtFecha: '',
      createdAtHora: '',
      updatedAtFecha: '',
      updatedAtHora: '',
      error: true,
      errorMessage: err.message,
    };
  }
};
