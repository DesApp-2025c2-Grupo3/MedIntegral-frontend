import { DIA_ENUM } from './diaEnum';

export const formatAgendaTurnosPrestador = (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const especialidades = Array.isArray(data.Especialidad)
      ? data.Especialidad.map((e) => ({
          id: e.id ?? null,
          nombre: e.nombre ?? '',
        }))
      : [];

    const rawCentros = data.centrosDeAtencion || data.CentroDeAtencion || [];

    const centrosDeAtencion = Array.isArray(rawCentros)
      ? rawCentros.map((cda) => ({
          id: cda.id,
          direccionId: cda.direccionId ?? cda.Direccion?.id ?? null,
          prestadorId: cda.prestadorId ?? null,
          direccion: {
            calle: cda.Direccion?.calle ?? '',
            altura: String(cda.Direccion?.altura ?? ''),
            pisoDepto: cda.Direccion?.pisoDepto ?? '',
            localidad: cda.Direccion?.localidad ?? '',
            provincia: cda.Direccion?.Provincia?.nombre ?? '',
          },
          horarios: Array.isArray(cda.horarios || cda.Horarios)
            ? (cda.horarios || cda.Horarios).map((h) => {
                const diaNombre =
                  typeof h.dia === 'string' ? h.dia : (h.dia?.nombre ?? '');
                return {
                  id: h.id,
                  dia: {
                    id: DIA_ENUM[diaNombre] ?? null,
                    nombre: diaNombre,
                  },
                  horaInicio: h.horaInicio ?? '',
                  horaFin: h.horaFin ?? '',
                  duracion: Number(h.duracionTurno ?? h.duracion) || null,
                };
              })
            : [],
        }))
      : [];

    const result = {
      id: data.id ?? null,
      nombre: data.nombre ?? '',
      cuilCuit: data.cuilCuit ?? '',
      esCentroMedico: data.esCentroMedico ?? false,
      integraCentroMedico: data.integraCentroMedico ?? false,
      centroMedicoId: data.centroMedicoId ?? null,
      especialidades,
      centrosDeAtencion,
      emails: data.Emails ?? [],
      telefonos: data.Telefonos ?? [],
    };

    return result;
  } catch (err) {
    console.error('Error al formatear prestador agenda:', err);

    return {
      id: null,
      especialidades: [],
      centrosDeAtencion: [],
      Emails: [],
      Telefonos: [],
      error: true,
      errorMessage: err.message,
    };
  }
};
