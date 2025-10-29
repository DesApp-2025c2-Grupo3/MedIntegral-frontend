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

const normalizarHorarios = (horario) => {
  const inicioRaw = horario.inicio || horario.horaInicio;
  const finRaw = horario.fin || horario.horaFin;

  const inicio = dayjs(inicioRaw, ['HH:mm', 'H:mm']);
  const fin = dayjs(finRaw, ['HH:mm', 'H:mm']);

  return { inicio, fin };
};

export const validateHorarioBasico = (horario) => {
  const { inicio, fin } = normalizarHorarios(horario);

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

  if (!inicio || !inicio.isValid()) {
    return {
      field: `horario-${horario.id}-inicio`,
      message: 'Debe seleccionar un horario de inicio',
    };
  }

  if (!fin || !fin.isValid()) {
    return {
      field: `horario-${horario.id}-fin`,
      message: 'Debe seleccionar un horario de fin',
    };
  }

  if (inicio.isSame(fin)) {
    return {
      field: `horario-${horario.id}-horario`,
      message: 'El inicio y el fin no pueden ser iguales',
    };
  }

  if (inicio.isAfter(fin)) {
    return {
      field: `horario-${horario.id}-horario`,
      message: 'El horario de inicio debe ser anterior al de fin',
    };
  }

  return null;
};

export const validateHorarioDentroDireccion = (horario, direccion) => {
  const rangoMin = horario.inicio;
  const rangoMax = horario.fin;

  for (const diaRaw of horario.dias) {
    const diaNombre =
      typeof diaRaw === 'object' && diaRaw.nombre ? diaRaw.nombre : diaRaw;

    const match = direccion.horarios?.some((dh) => {
      const nombre = typeof dh.dia === 'string' ? dh.dia : dh.dia?.nombre;
      const inicioOK =
        rangoMin.isSame(dayjs(dh.horaInicio, 'HH:mm')) ||
        rangoMin.isAfter(dayjs(dh.horaInicio, 'HH:mm'));
      const finOK =
        rangoMax.isSame(dayjs(dh.horaFin, 'HH:mm')) ||
        rangoMax.isBefore(dayjs(dh.horaFin, 'HH:mm'));
      return nombre === diaNombre && inicioOK && finOK;
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
  const { inicio, fin } = normalizarHorarios(horario);
  if (!inicio.isValid() || !fin.isValid()) return null;

  const rangoMinutos = fin.diff(inicio, 'minute');
  if (Number(horario.duracion) > rangoMinutos) {
    return {
      field: `horario-${horario.id}-duracion`,
      message: 'La duración del turno no puede ser mayor que el rango horario',
    };
  }

  return null;
};

export const validateSolapamiento = (horario, horarios) => {
  const { inicio, fin } = normalizarHorarios(horario);
  if (!inicio.isValid() || !fin.isValid()) return null;

  const index = horarios.findIndex((h) => h.id === horario.id);

  for (let j = 0; j < horarios.length; j++) {
    if (j === index) continue;

    const other = horarios[j];
    const { inicio: oInicio, fin: oFin } = normalizarHorarios(other);

    if (!oInicio.isValid() || !oFin.isValid()) continue;

    const compartenDia = (horario.dias || []).some((d) =>
      (other.dias || []).some(
        (od) => obtenerNombreDia(od) === obtenerNombreDia(d)
      )
    );

    if (!compartenDia) continue;

    const empiezaDuranteOtro = inicio.isAfter(oInicio) && inicio.isBefore(oFin);
    const terminaDuranteOtro = fin.isAfter(oInicio) && fin.isBefore(oFin);
    const cubreTotalmente =
      inicio.isSameOrBefore(oInicio) && fin.isSameOrAfter(oFin);

    if (empiezaDuranteOtro || terminaDuranteOtro || cubreTotalmente) {
      const diasLimpios = (horario.dias || [])
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
