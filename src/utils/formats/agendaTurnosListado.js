import { groupHorariosSimple } from './horarioGrouping';
import { formatDias } from './formatDias';

export const formatAgendaTurnosListado = (data) => {
  try {
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const itemsFormateados = data.items.map((a) => {
      const dir = a.direccion
        ? `${a.direccion.calle || ''} ${a.direccion.altura || ''}${
            a.direccion.pisoDepto ? ', ' + a.direccion.pisoDepto : ''
          }, ${a.direccion.localidad || ''}, ${a.direccion.provincia || ''}`.trim()
        : '';

      const horariosAgrupados = groupHorariosSimple(a.horariosAtencion);

      const horarios = horariosAgrupados.map((g) => {
        const diasTexto = formatDias(g.dias);
        return `${diasTexto} - ${g.horaInicio}hs a ${g.horaFin}hs (${g.duracion} minutos)`;
      });

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
        horarios,
        direccion: dir,
        url: a.id ? `/agenda-turnos/detalle/${a.id}` : null,
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
