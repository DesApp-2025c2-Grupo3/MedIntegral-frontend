import {
  validateCuilCuit,
  validateNombre,
  validateTelefonos,
  validateEmails,
} from './validateContacto';
import { validateSingleDireccion } from './validateDireccion';

export const validateAltaPrestador = (data) => {
  let error;

  error = validateCuilCuit(data.cuilCuit);
  if (error) return error;

  error = validateNombre(data.nombre);
  if (error) return error;

  error = validateTelefonos(data.telefonos);
  if (error) return error;

  error = validateEmails(data.emails);
  if (error) return error;

  if (data.especialidades.length === 0) {
    return {
      field: 'especialidades',
      message: 'Seleccioná al menos una especialidad.',
    };
  }

  if (!data.centrosDeAtencion || data.centrosDeAtencion.length === 0) {
    return {
      field: 'centrosDeAtencion',
      message: 'Tenés que agregar al menos un centro de atención.',
    };
  }

  //Verificación de centros de atencion (dirección y horarios)
  for (const centro of data.centrosDeAtencion) {
    const idPrefijo = `centro-${centro.id}`;
    error = validateSingleDireccion(centro, idPrefijo);
    if (error) return error;

    if (!centro.horarios || centro.horarios.length === 0) {
      return {
        field: `centro-${centro.id}-horarios`,
        message: 'Tenés que agregar al menos un horario al centro.',
      };
    }

    for (const horario of centro.horarios) {
      if (!horario.dias || horario.dias.length === 0) {
        return {
          field: `horario-${horario.id}-dias`,
          message: 'Seleccioná un día.',
        };
      }

      if (!horario.inicio) {
        return {
          field: `horario-${horario.id}-inicio`,
          message: 'Tenés que indicar un horario de inicio.',
        };
      }

      if (!horario.fin) {
        return {
          field: `horario-${horario.id}-fin`,
          message: 'Tenés que indicar un horario de fin.',
        };
      }

      if (horario.inicio.isSame(horario.fin)) {
        return {
          field: `horario-${horario.id}-horario`,
          message: 'El inicio y el fin no pueden ser iguales',
        };
      }

      if (horario.inicio > horario.fin) {
        return {
          field: `horario-${horario.id}-horario`,
          message: 'El horario de inicio debe ser anterior al de fin.',
        };
      }
    }
  }

  return null;
};
