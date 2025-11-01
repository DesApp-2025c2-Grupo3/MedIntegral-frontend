import { DIA_ENUM } from './diaEnum';

export const formatAgendaTurnosPrestador = (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const centrosDeAtencion = Array.isArray(data.centrosDeAtencion)
      ? data.centrosDeAtencion.map((cda) => ({
          ...cda,
          horarios: Array.isArray(cda.horarios)
            ? cda.horarios.map((h) => {
                const diaNombre = h.dia;
                const diaId = DIA_ENUM[diaNombre] ?? null;

                return {
                  dia: {
                    id: diaId,
                    nombre: diaNombre,
                  },
                  horaInicio: h.horaInicio ?? '',
                  horaFin: h.horaFin ?? '',
                };
              })
            : [],
        }))
      : [];
    return { ...data, centrosDeAtencion };
  } catch (err) {
    console.error(
      'Error al formatear el prestador de agenda la agenda de turnos:',
      err
    );

    return {
      ...data,
      centrosDeAtencion: [],
      error: true,
      errorMessage: err.message,
    };
  }
};
