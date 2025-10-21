import { formatDireccion } from './formatDireccion';
import { formatHorarios } from './formatHorarios';
import { formatDias } from './formatDias';

export const formatAgendaTurnosListado = (data) => {
  try {
    const rawItems = Array.isArray(data)
      ? data
      : Array.isArray(data.items)
        ? data.items
        : [];

    if (!rawItems.length) {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const itemsFormateados = rawItems.map((a) => {
      const horariosTexto = formatHorarios(a.horariosAtencion);

      const horariosAtencion = Array.isArray(a.horariosAtencion)
        ? a.horariosAtencion.map((h, idx) => ({
            dias: formatDias(h.dias),
            horarios: horariosTexto[idx] || '',
          }))
        : [];

      return {
        id: a.id ?? null,
        prestador:
          typeof a.prestador === 'object'
            ? (a.prestador?.nombre ?? '')
            : (a.prestador ?? ''),
        especialidad:
          typeof a.especialidad === 'object'
            ? (a.especialidad?.nombre ?? '')
            : (a.especialidad ?? ''),
        direccion: formatDireccion(a.direccion),
        horariosAtencion,
        url: a.id ? `/agenda-turnos/${a.id}` : null,
      };
    });

    return { ...data, items: itemsFormateados };
  } catch (err) {
    console.error('Error al formatear agendas:', err);
    return {
      ...data,
      items: [],
      error: true,
      errorMessage: err.message,
    };
  }
};
