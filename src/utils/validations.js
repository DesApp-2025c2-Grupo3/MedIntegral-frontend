export const validateAltaTurnos = ({
  prestador,
  especialidad,
  direccion,
  horarios,
}) => {
  if (!prestador)
    return { field: 'prestador', message: 'Debe seleccionar un prestador' };
  if (!especialidad)
    return {
      field: 'especialidad',
      message: 'Debe seleccionar una especialidad',
    };
  if (!direccion)
    return { field: 'direccion', message: 'Debe seleccionar una dirección' };

  if (!horarios || horarios.length === 0) {
    return { field: 'horarios', message: 'Debe agregar al menos un horario' };
  }

  for (let i = 0; i < horarios.length; i++) {
    const h = horarios[i];

    if (!h.dias || h.dias.length === 0) {
      return {
        field: `horario-${i}-dias`,
        message: 'Seleccione al menos un día de la semana',
      };
    }

    if (!h.duracion) {
      return {
        field: `horario-${i}-duracion`,
        message: 'Debe indicar la duración del turno',
      };
    }

    if (!h.inicio) {
      return {
        field: `horario-${i}-inicio`,
        message: 'Debe seleccionar un horario de inicio',
      };
    }
    if (!h.fin) {
      return {
        field: `horario-${i}-fin`,
        message: 'Debe seleccionar un horario de fin',
      };
    }

    if (h.inicio.isSame(h.fin)) {
      return {
        field: `horario-${i}-horario`,
        message: 'El inicio y el fin no pueden ser iguales',
      };
    }
    if (h.inicio.isAfter(h.fin)) {
      return {
        field: `horario-${i}-horario`,
        message: 'El horario de inicio debe ser anterior al de fin',
      };
    }
  }

  return null;
};
