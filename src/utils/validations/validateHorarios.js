// Validaciones específicas de un horario individual
export const validateHorarioBasico = (horario, index) => {
  if (!horario.dias || horario.dias.length === 0) {
    return {
      field: `horario-${index}-dias`,
      message: 'Seleccione al menos un día de la semana',
    };
  }

  if (!horario.duracion) {
    return {
      field: `horario-${index}-duracion`,
      message: 'Debe indicar la duración del turno',
    };
  }

  if (!horario.inicio) {
    return {
      field: `horario-${index}-inicio`,
      message: 'Debe seleccionar un horario de inicio',
    };
  }

  if (!horario.fin) {
    return {
      field: `horario-${index}-fin`,
      message: 'Debe seleccionar un horario de fin',
    };
  }

  if (horario.inicio.isSame(horario.fin)) {
    return {
      field: `horario-${index}-horario`,
      message: 'El inicio y el fin no pueden ser iguales',
    };
  }

  if (horario.inicio.isAfter(horario.fin)) {
    return {
      field: `horario-${index}-horario`,
      message: 'El horario de inicio debe ser anterior al de fin',
    };
  }

  return null;
};

// Validar que esté dentro de los horarios definidos en la dirección
export const validateHorarioDentroDireccion = (horario, direccion, index) => {
  const rangoMin = horario.inicio.format('HH:mm');
  const rangoMax = horario.fin.format('HH:mm');

  for (const dia of horario.dias) {
    const match = direccion.horarios?.some(
      (dh) =>
        dh.dia.nombre === dia &&
        dh.horaInicio <= rangoMin &&
        dh.horaFin >= rangoMax
    );
    if (!match) {
      return {
        field: `horario-${index}-horario`,
        message: `El rango definido para ${dia} no está dentro de los horarios de atención del centro`,
      };
    }
  }

  return null;
};

// Validar que la duración sea menor o igual al rango
export const validateDuracionVsRango = (horario, index) => {
  const rangoMinutos = horario.fin.diff(horario.inicio, 'minute');
  if (horario.duracion > rangoMinutos) {
    return {
      field: `horario-${index}-duracion`,
      message: 'La duración del turno no puede ser mayor que el rango horario',
    };
  }
  return null;
};

// Validar que no se solape con otro horario
export const validateSolapamiento = (horario, horarios, index) => {
  for (let j = 0; j < horarios.length; j++) {
    if (j === index) continue;
    const other = horarios[j];
    const overlap = horario.dias.some((d) => other.dias.includes(d));
    if (overlap) {
      const startsInside =
        horario.inicio.isBefore(other.fin) &&
        horario.inicio.isSameOrAfter(other.inicio);
      const endsInside =
        horario.fin.isAfter(other.inicio) &&
        horario.fin.isSameOrBefore(other.fin);
      const fullyCovers =
        horario.inicio.isBefore(other.inicio) && horario.fin.isAfter(other.fin);

      if (startsInside || endsInside || fullyCovers) {
        return {
          field: `horario-${index}-horario`,
          message: `El rango horario se solapa con otro definido para ${horario.dias.join(
            ', '
          )}`,
        };
      }
    }
  }
  return null;
};
