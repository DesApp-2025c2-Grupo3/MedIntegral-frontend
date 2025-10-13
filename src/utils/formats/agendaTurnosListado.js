export const formatAgendaTurnosListado = (data) => {
  try {
    if (!data || !Array.isArray(data.items)) {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const itemsFormateados = data.items.map((a) => {
      const dir = a.direccion
        ? `${a.direccion.calle || ''} ${a.direccion.altura || ''}${
            a.direccion.pisoDepto ? ', ' + a.direccion.pisoDepto : ''
          }, ${a.direccion.localidad || ''}, ${a.direccion.provincia || ''}`.trim()
        : '';

      const horarios =
        a.horariosAtencion?.map((h) => {
          const dias =
            h.dias?.map((d) => (typeof d === 'string' ? d : d?.nombre || '')) ||
            [];

          return `${dias.join(', ')} - ${h.horarioInicio || '?'}hs a ${h.horarioFin || '?'}hs`;
        }) || [];

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
        duracion: a.duracion ? `${a.duracion} minutos` : '',
      };
    });

    return {
      ...data,
      items: itemsFormateados,
    };
  } catch (err) {
    console.error('Error al formatear agendas:', err);
    return {
      ...data,
      items: data?.items || [],
      error: true,
      errorMessage: err.message,
    };
  }
};
