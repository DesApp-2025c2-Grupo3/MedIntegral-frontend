import { formatDireccion } from './formatDireccion';
import { formatHorarios } from './formatHorarios';
import { formatDias } from './formatDias';

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
      createdAt: data.createdAt || null,
      updatedAt: data.updatedAt || null,
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
      createdAt: null,
      updatedAt: null,
      error: true,
      errorMessage: err.message,
    };
  }
};
