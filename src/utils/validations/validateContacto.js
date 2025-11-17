const REGEX_NUMERIC = /^\d+$/;

const REGEX_CUIL_CUIT = /^\d{11}$/;

const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;

const REGEX_TELEFONO_CLEAN = /^\d{8,15}$/;

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validateBaseNumeric = (value, fieldName) => {
  if (!value || String(value).trim() === '') {
    return { field: fieldName, message: `Este campo es obligatorio.` };
  }

  if (!REGEX_NUMERIC.test(String(value))) {
    return {
      field: fieldName,
      message: `Solo se permiten números (sin puntos ni guiones).`,
    };
  }

  return null;
};

export const validateCuilCuit = (cuilCuit) => {
  const fieldName = 'cuilCuit';

  let error = validateBaseNumeric(cuilCuit, fieldName);
  if (error) return error;

  if (!REGEX_CUIL_CUIT.test(String(cuilCuit))) {
    return {
      field: 'cuilCuit',
      message: 'El CUIL/CUIT debe contener exactamente 11 dígitos.',
    };
  }

  return null;
};

export const validateNumeroDocumento = (
  numeroDocumento,
  fieldName = 'numeroDocumento'
) => {
  return validateBaseNumeric(numeroDocumento, fieldName);
};

export const validateNombre = (nombre, fieldName = 'nombre') => {
  if (!nombre || nombre.trim() === '') {
    return { field: fieldName, message: `El nombre es obligatorio.` };
  }
  if (!REGEX_NOMBRE.test(nombre)) {
    return {
      field: fieldName,
      message: `Solo letras y espacios (mínimo 2 caracteres).`,
    };
  }
  return null;
};

export const validateTelefonos = (telefonos, fieldBase = 'telefonos') => {
  if (!telefonos || telefonos.length === 0) {
    return {
      field: fieldBase,
      message: 'Agregá al menos un teléfono y presioná Enter.',
    };
  }

  for (const t of telefonos) {
    const valor = String(t.numero ?? t).replace(/\s/g, '');

    if (!REGEX_TELEFONO_CLEAN.test(valor)) {
      return {
        field: fieldBase,
        message:
          'Cada teléfono debe tener entre 8 y 15 dígitos numéricos. Ingresalo y presioná Enter.',
      };
    }
  }
  return null;
};

export const validateEmails = (emails, fieldBase = 'emails') => {
  if (!emails || emails.length === 0) {
    return {
      field: fieldBase,
      message: 'Agregá al menos un email y presioná Enter.',
    };
  }

  for (const e of emails) {
    const valor = e.direccion ?? e;
    if (!REGEX_EMAIL.test(valor)) {
      return {
        field: fieldBase,
        message:
          'Ingresá un email válido (ej: usuario@gmail.com) y presioná Enter.',
      };
    }
  }
  return null;
};
