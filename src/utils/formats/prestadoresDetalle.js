import { formatDireccion } from './formatDireccion';
import { formatFecha, formatHora } from './formatFechaHora';
import { DIA_ENUM } from './diaEnum';

export const formatPrestadorDetalle = (data) => {
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const emails = Array.isArray(data.emails)
      ? data.emails.map((e) => ({
          id: e.id ?? null,
          direccion: e.direccion ?? '',
        }))
      : [];

    const telefonos = Array.isArray(data.telefonos)
      ? data.telefonos.map((t) => ({
          id: t.id ?? null,
          numero: t.numero ?? '',
        }))
      : [];

    const especialidades = Array.isArray(data.especialidad)
      ? data.especialidad.map((e) => ({
          id: e.id ?? null,
          nombre: e.nombre ?? '',
        }))
      : [];

    const centrosAtencion = Array.isArray(data.CentroDeAtencion)
      ? data.CentroDeAtencion.map((ca) => ({
          id: ca.id ?? null,
          direccion: {
            calle: ca.calle ?? '',
            altura: ca.altura ?? '',
            pisoDepto: ca.pisoDepto ?? '',
            localidad: ca.localidad ?? '',
            provincia: ca.provincia ?? null,
          },
          direccionTexto: formatDireccion(ca),
          horarios: Array.isArray(ca.Horarios)
            ? ca.Horarios.map((h) => {
                const diaNombre = h.dia;
                return {
                  id: h.id,
                  dia: {
                    id: DIA_ENUM[diaNombre] ?? null,
                    nombre: diaNombre,
                  },
                  horaInicio: h.horaInicio ?? '',
                  horaFin: h.horaFin ?? '',
                  duracion: Number(h.duracionTurno) || null,
                  createdAtFecha: formatFecha(h.createdAt),
                  createdAtHora: formatHora(h.createdAt),
                  updatedAtFecha: formatFecha(h.updatedAt),
                  updatedAtHora: formatHora(h.updatedAt),
                };
              })
            : [],
        }))
      : [];

    return {
      id: data.id ?? null,
      nombre: data.nombre ?? '',
      cuilCuit: data.cuilCuit ?? '',
      esCentroMedico: Boolean(data.esCentroMedico),
      integraCentroMedico: Boolean(data.integraCentroMedico),
      centroMedicoId: data.centroMedicoId ?? null,

      emails,
      telefonos,
      especialidades,
      centrosAtencion,

      createdAtFecha: formatFecha(data.createdAt),
      createdAtHora: formatHora(data.createdAt),
      updatedAtFecha: formatFecha(data.updatedAt),
      updatedAtHora: formatHora(data.updatedAt),
    };
  } catch (err) {
    console.error('Error al formatear detalle del prestador:', err);

    return {
      id: null,
      nombre: '',
      cuilCuit: '',
      esCentroMedico: false,
      integraCentroMedico: false,
      centroMedicoId: null,
      emails: [],
      telefonos: [],
      especialidades: [],
      centrosAtencion: [],
      createdAtFecha: '',
      createdAtHora: '',
      updatedAtFecha: '',
      updatedAtHora: '',
      error: true,
      errorMessage: err.message,
    };
  }
};
