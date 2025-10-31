import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const obtenerNombreDia = (diaRaw) => {
  if (!diaRaw) return '';
  if (typeof diaRaw === 'object' && diaRaw.nombre) return diaRaw.nombre;
  if (typeof diaRaw === 'string') return diaRaw.split('(')[0].trim();
  return '';
};

export const validateHorarioBasico = (horario) => {
  if (!horario.dias || horario.dias.length === 0) {
    return {
      field: `horario-${horario.id}-dias`,
      message: 'Seleccione al menos un día de la semana',
    };
  }

  if (!horario.duracion) {
    return {
      field: `horario-${horario.id}-duracion`,
      message: 'Debe indicar la duración del turno',
    };
  }

  if (!horario.inicio) {
    return {
      field: `horario-${horario.id}-inicio`,
      message: 'Debe seleccionar un horario de inicio',
    };
  }

  if (!horario.fin) {
    return {
      field: `horario-${horario.id}-fin`,
      message: 'Debe seleccionar un horario de fin',
    };
  }

  if (horario.inicio.isSame(horario.fin)) {
    return {
      field: `horario-${horario.id}-horario`,
      message: 'El inicio y el fin no pueden ser iguales',
    };
  }

  if (horario.inicio.isAfter(horario.fin)) {
    return {
      field: `horario-${horario.id}-horario`,
      message: 'El horario de inicio debe ser anterior al de fin',
    };
  }

  return null;
};

export const validateHorarioDentroDireccion = (horario, direccion) => {
  const rangoMin = horario.inicio.format('HH:mm');
  const rangoMax = horario.fin.format('HH:mm');

  for (const diaRaw of horario.dias) {
    const diaNombre = obtenerNombreDia(diaRaw);
    const match = direccion.horarios?.some((dh) => {
      const coincideDia = dh.dias.some((d) => d.nombre === diaNombre);
      return coincideDia && dh.horaInicio <= rangoMin && dh.horaFin >= rangoMax;
    });

    if (!match) {
      return {
        field: `horario-${horario.id}-horario`,
        message: `El rango definido para ${diaNombre} no está dentro de los horarios de atención del centro`,
      };
    }
  }

  return null;
};

export const validateDuracionVsRango = (horario) => {
  const rangoMinutos = horario.fin.diff(horario.inicio, 'minute');

  if (horario.duracion > rangoMinutos) {
    return {
      field: `horario-${horario.id}-duracion`,
      message: 'La duración del turno no puede ser mayor que el rango horario',
    };
  }
  return null;
};

export const validateSolapamiento = (horario, horarios) => {
  const index = horarios.findIndex((h) => h.id === horario.id);

  for (let j = 0; j < index; j++) {
    const other = horarios[j];

    const compartenDia = horario.dias.some((d) =>
      other.dias.some((od) => obtenerNombreDia(od) === obtenerNombreDia(d))
    );

    if (!compartenDia) continue;

    const empiezaDuranteOtro =
      horario.horaInicio.isAfter(other.horaInicio) &&
      horario.horaInicio.isBefore(other.horaFin);

    const terminaDuranteOtro =
      horario.horaFin.isAfter(other.horaInicio) &&
      horario.horaFin.isBefore(other.horaFin);

    const cubreTotalmente =
      horario.horaInicio.isSameOrBefore(other.horaInicio) &&
      horario.horaFin.isSameOrAfter(other.horaFin);

    if (empiezaDuranteOtro || terminaDuranteOtro || cubreTotalmente) {
      const diasLimpios = horario.dias
        .map((d) => obtenerNombreDia(d))
        .join(', ');
      return {
        field: `horario-${horario.id}-horario`,
        message: `El rango horario se solapa con otro definido para ${diasLimpios}`,
      };
    }
  }

  return null;
};
