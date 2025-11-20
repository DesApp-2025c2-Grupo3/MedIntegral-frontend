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
    nombre,
    apellido,
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
    nombre,
    apellido,
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

  if (nombre && nombre.length < 2) {
    return {
      field: 'nombre',
      message: 'Tenés que ingresar al menos 2 carácteres.',
    };
  }

  if (apellido && apellido.length < 2) {
    return {
      field: 'apellido',
      message: 'Tenés que ingresar al menos 2 carácteres.',
    };
  }

  if (nroAfiliado && !REGEX_NUMERIC.test(nroAfiliado)) {
    return {
      field: 'nroAfiliado',
      message: 'Ingrese sólo el número de afiliado sin 0.',
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
      message: 'Seleccioná una provincia válida de la lista.',
    };
  }

  if (localidad && localidad.length < 3) {
    return {
      field: 'localidad',
      message: 'Ingrese al menos 3 caracteres para buscar una localidad.',
    };
  }

  if (telefono) {
    if (!REGEX_TELEFONO_CLEAN.test(telefono) || telefono.length > 10) {
      return {
        field: 'telefono',
        message:
          'Ingrese un número de teléfono válido (debe contener entre 8 y 10 dígitos).',
      };
    }
  }

  if (email && !REGEX_EMAIL.test(email)) {
    return {
      field: 'email',
      message: 'Tenés que ingresar un correo electrónico válido.',
    };
  }

  if (vigenciaDesde && vigenciaHasta) {
    const desde = dayjs(vigenciaDesde);
    const hasta = dayjs(vigenciaHasta);

    if (desde.isAfter(hasta)) {
      return {
        field: 'vigenciaHasta',
        message: 'La fecha "hasta" no puede ser anterior a la fecha "desde".',
      };
    }
  }

  const hoy = dayjs();

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
