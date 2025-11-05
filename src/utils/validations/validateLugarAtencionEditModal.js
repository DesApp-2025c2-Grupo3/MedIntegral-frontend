import { validateSingleDireccion } from './validateDireccion';
import dayjs from 'dayjs';
import {
  validateHorarioBasico,
  validateDuracionVsRango,
  validateSolapamiento,
} from './validateHorarios';

export const validateLugarAtencionEditModal = (centros) => {
  if (!centros || centros.length === 0) {
    return {
      field: 'centrosDeAtencion',
      message: 'Tenés que agregar al menos un centro de atención.',
    };
  }

  for (const centro of centros) {
    const prefix = `centro-${centro.id}`;

    const errorDireccion = validateSingleDireccion(centro, prefix);
    if (errorDireccion) return errorDireccion;

    if (!centro.horarios || centro.horarios.length === 0) {
      return {
        field: `${prefix}-horarios`,
        message: 'Tenés que agregar al menos un horario al centro.',
      };
    }

    for (const horario of centro.horarios) {
      const idPrefix = `horario-${horario.id}`;
      const h = {
        ...horario,
        inicio: dayjs(horario.horaInicio || horario.inicio, 'HH:mm'),
        fin: dayjs(horario.horaFin || horario.fin, 'HH:mm'),
      };

      let error;

      error = validateHorarioBasico(h);
      if (error) return { ...error, field: `${idPrefix}-${error.field}` };

      error = validateDuracionVsRango(h);
      if (error) return { ...error, field: `${idPrefix}-${error.field}` };

      error = validateSolapamiento(h, centro.horarios);
      if (error) return { ...error, field: `${idPrefix}-${error.field}` };
    }
  }

  return null;
};
