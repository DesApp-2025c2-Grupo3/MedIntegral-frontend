import { DIA_ENUM } from './diaEnum';

export const formatAgendaTurnosPrestador = (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('La respuesta no tiene el formato esperado');
    }
    const rawCentros = data.CentroDeAtencion;
    console.log(rawCentros);
    const centrosDeAtencion = Array.isArray(rawCentros)
      ? rawCentros.map((cda) => ({
          id: cda.id,
          direccionId: cda.Direccion?.id ?? null,
          calle: cda.Direccion?.calle ?? '',
          altura: String(cda.Direccion?.altura ?? ''),
          pisoDepto: cda.Direccion?.pisoDepto ?? '',
          codigoPostal: cda.Direccion?.codigoPostal ?? '',
          localidad: cda.Direccion?.localidad ?? '',
          provincia: cda.Direccion?.Provincia
            ? {
                id: cda.Direccion.Provincia.id,
                nombre: cda.Direccion.Provincia.nombre,
              }
            : null,

          horarios: Array.isArray(cda.Horarios)
            ? cda.Horarios.map((h) => {
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
      especialidades: data.Especialidad ?? [],
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
