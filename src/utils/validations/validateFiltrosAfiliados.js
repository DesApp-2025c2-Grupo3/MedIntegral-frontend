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
    numeroDocumento,
    nroAfiliado,
    fechaNacimiento,
    provincia,
    localidad,
    telefono,
    email,
    vigenciaDesde,
    vigenciaHasta,
  } = filtros;

  const algunoCargado = [
    nombre,
    apellido,
    numeroDocumento,
    nroAfiliado,
    fechaNacimiento,
    provincia,
    localidad,
    telefono,
    email,
    vigenciaDesde,
    vigenciaHasta,
  ].some((v) => !!v && v !== '');

  if (!algunoCargado) {
    return {
      field: null,
      message: 'Debe completar al menos un filtro para realizar la búsqueda.',
    };
  }

  if (nombre && nombre.length < 2) {
    return {
      field: 'nombre',
      message: 'Debe ingresar al menos 2 carácteres.',
    };
  }

  if (apellido && apellido.length < 2) {
    return {
      field: 'apellido',
      message: 'Debe ingresar al menos 2 carácteres.',
    };
  }

  if (
    numeroDocumento &&
    !REGEX_NUMERIC.test(numeroDocumento) &&
    !numeroDocumento.length < 8
  ) {
    return {
      field: 'numeroDocumento',
      message:
        'Ingrese un número de documento válido (debe contener 8 números).',
    };
  }

  if (nroAfiliado && nroAfiliado.length < 6) {
    return {
      field: 'nroAfiliado',
      message:
        'Ingrese al menos 6 caracteres para buscar por número de afiliado.',
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
      message: 'Debe seleccionar una provincia válida de la lista.',
    };
  }

  if (localidad && localidad.length < 3) {
    return {
      field: 'localidad',
      message: 'Ingrese al menos 3 caracteres para buscar una localidad.',
    };
  }

  if (telefono) {
    const limpio = telefono.replace(/[\s()+-]/g, '');

    if (!REGEX_TELEFONO_CLEAN.test(limpio)) {
      return {
        field: 'telefono',
        message: 'El teléfono debe ser numérico y tener entre 8 y 15 dígitos.',
      };
    }
  }

  if (email && !REGEX_EMAIL.test(email)) {
    return {
      field: 'email',
      message: 'Debe ingresar un correo electrónico válido.',
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
  return null;
}
