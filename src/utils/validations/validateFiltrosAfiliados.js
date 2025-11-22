import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const REGEX_NUMERIC = /^\d+$/;
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const REGEX_TELEFONO_CLEAN = /^\d{8,15}$/;

export default function validateFiltrosAgendaTurnos(filtros) {
  const {
    tipoDocumento,
    nroAfiliado,
    fechaNacimiento,
    planMedico,
    provincia,
    localidad,
    telefono,
    email,
    vigenciaDesde,
    vigenciaHasta,
    creacionDesde,
    creacionHasta,
    estado,
  } = filtros;

  const algunoCargado = [
    tipoDocumento,
    nroAfiliado,
    fechaNacimiento,
    planMedico,
    provincia,
    localidad,
    telefono,
    email,
    vigenciaDesde,
    vigenciaHasta,
    creacionDesde,
    creacionHasta,
    estado,
  ].some((v) => !!v && v !== '');

  if (!algunoCargado) {
    return {
      field: null,
      message:
        'Tenés que completar al menos un filtro para realizar la búsqueda.',
    };
  }

  if (
    nroAfiliado &&
    (!REGEX_NUMERIC.test(nroAfiliado) || nroAfiliado.length > 7)
  ) {
    return {
      field: 'nroAfiliado',
      message:
        'El número de afiliado no puede contener más de 7 números ni caracteres especiales.',
    };
  }

  if (fechaNacimiento && dayjs(fechaNacimiento).isAfter(dayjs())) {
    return {
      field: 'fechaNacimiento',
      message: 'La fecha de nacimiento no puede ser posterior a hoy.',
    };
  }

  if (provincia && typeof provincia === 'string') {
    return {
      field: 'provincia',
      message: 'Seleccione una provincia válida de la lista.',
    };
  }

  if (localidad && localidad.length < 3) {
    return {
      field: 'localidad',
      message: 'Ingrese al menos 3 caracteres para buscar una localidad.',
    };
  }

  if (telefono) {
    if (!REGEX_TELEFONO_CLEAN.test(telefono)) {
      return {
        field: 'telefono',
        message: 'El teléfono debe tener solo números entre 8 y 15 dígitos.',
      };
    }
  }

  if (email && !REGEX_EMAIL.test(email)) {
    return {
      field: 'email',
      message: 'El email debe tener un formato válido (ej: usuario@gmail.com).',
    };
  }

  const hoy = dayjs();

  if (
    vigenciaDesde &&
    dayjs(vigenciaDesde).isAfter(hoy) &&
    (!estado || estado.value === 'Vigentes' || estado.value === 'Bajas')
  ) {
    return {
      field: 'vigenciaDesde',
      message: 'La fecha no puede ser posterior a hoy',
    };
  } else if (
    vigenciaDesde &&
    dayjs(vigenciaDesde).isBefore(hoy) &&
    estado?.value === 'Vigencia futura'
  ) {
    return {
      field: 'vigenciaDesde',
      message: 'La fecha no puede ser anterior a hoy',
    };
  }

  if (
    vigenciaHasta &&
    dayjs(vigenciaHasta).isBefore(hoy) &&
    (!estado ||
      estado.value === 'Vigentes' ||
      estado.value === 'Vigencia futura')
  ) {
    return {
      field: 'vigenciaHasta',
      message: 'La fecha debe ser posterior a hoy.',
    };
  } else if (
    vigenciaHasta &&
    dayjs(vigenciaHasta).isAfter(hoy) &&
    estado?.value === 'Bajas'
  ) {
    return {
      field: 'vigenciaHasta',
      message: 'La fecha no puede ser posterior a hoy',
    };
  }

  if (vigenciaDesde && vigenciaHasta) {
    const desde = dayjs(vigenciaDesde);
    const hasta = dayjs(vigenciaHasta);

    if (desde.isSame(hasta)) {
      return {
        field: 'vigenciaHasta',
        message: 'Las fechas no pueden ser iguales',
      };
    }

    if (desde.isAfter(hasta)) {
      return {
        field: 'vigenciaHasta',
        message: 'La fecha "hasta" no puede ser anterior a la fecha "desde".',
      };
    }
  }

  if (creacionDesde && dayjs(creacionDesde).isAfter(hoy)) {
    return {
      field: 'creacionDesde',
      message: 'La fecha no puede ser posterior a hoy.',
    };
  }

  if (creacionHasta && dayjs(creacionHasta).isAfter(hoy)) {
    return {
      field: 'creacionHasta',
      message: 'La fecha no puede ser posterior a hoy.',
    };
  }

  if (creacionDesde && creacionHasta) {
    const desde = dayjs(creacionDesde);
    const hasta = dayjs(creacionHasta);

    if (desde.isSame(hasta)) {
      return {
        field: 'creacionHasta',
        message: 'Las fechas no pueden ser iguales.',
      };
    }

    if (desde.isAfter(hasta)) {
      return {
        field: 'creacionHasta',
        message: 'La fecha "hasta" no puede ser anterior a la fecha "desde".',
      };
    }
  }
  return null;
}
