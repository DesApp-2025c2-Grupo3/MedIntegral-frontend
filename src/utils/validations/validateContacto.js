const REGEX_NUMERIC = /^\d+$/; //solo dígitos
const REGEX_CUIL_CUIT = /^\d{11}$/; //11 digitos
const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/; //solo letras
const REGEX_TELEFONO_CLEAN = /^\d{8,15}$/; //al menos 8 dígitos
const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //formato email

/**
 * Valida que el campo de documento sea obligatorio y tenga solo números (para CUIL/CUIT y Número de Documento).
 */
const validateBaseNumeric = (id, fieldName) => {
  if (!id) {
    return { field: fieldName, message: `El ${fieldName} es obligatorio.` };
  }

  const cleanValue = String(id).replace(/[-.]/g, '');

  if (!REGEX_NUMERIC.test(cleanValue)) {
    return {
      field: fieldName,
      message: `El documento solo puede ser numérico.`,
    };
  }
  return null;
};

/**
 * CUIL/CUIT obligatorio, 11 dígitos, solo numérico.
 */
export const validateCuilCuit = (cuilCuit) => {
  const fieldName = 'cuilCuit';

  let error = validateBaseNumeric(cuilCuit, fieldName);
  if (error) return error;

  const cleanCuilCuit = String(cuilCuit).replace(/[-.]/g, '');

  if (!REGEX_CUIL_CUIT.test(cleanCuilCuit)) {
    return {
      field: 'cuilCuit',
      message:
        'El CUIL o CUIT debe ser numérico y contener exactamente 11 dígitos.',
    };
  }
  return null;
};

/**
 * Número de Documento obligatorio y solo numérico.
 */
export const validateNumeroDocumento = (
  numeroDocumento,
  fieldName = 'numeroDocumento'
) => {
  return validateBaseNumeric(numeroDocumento, fieldName);
};

/**
 * Nombre/Apellido obligatorio, solo letras/espacios, mínimo 2 caracteres.
 */
export const validateNombre = (nombre, fieldName = 'nombre') => {
  if (!nombre) {
    return { field: fieldName, message: `El ${fieldName} es obligatorio.` };
  }
  if (!REGEX_NOMBRE.test(nombre)) {
    return {
      field: fieldName,
      message: `El ${fieldName} solo puede contener letras y espacios (Mín. 2 caracteres).`,
    };
  }
  return null;
};

/**
 * Teéfono obligatorio, solo numérico, mínimo 8 dígitos.
 */
export const validateTelefonos = (telefonos, fieldBase = 'telefonos') => {
  if (!telefonos || telefonos.length === 0) {
    return { field: fieldBase, message: 'El teléfono es obligatorio.' };
  }

  for (const t of telefonos) {
    const valor = String(t.numero || t);
    const valorLimpio = valor.replace(/[\s()\- +]/g, '');

    if (!REGEX_TELEFONO_CLEAN.test(valorLimpio)) {
      return {
        field: fieldBase,
        message: 'El teléfono debe ser numérico y tener entre 8 y 15 dígitos.',
      };
    }
  }
  return null;
};

/**
 * Email obligatorio, formato estándar de email.
 */
export const validateEmails = (emails, fieldBase = 'emails') => {
  if (!emails || emails.length === 0) {
    return { field: fieldBase, message: 'El email es obligatorio.' };
  }

  for (const e of emails) {
    const valor = e.valor || e;
    if (!REGEX_EMAIL.test(valor)) {
      return {
        field: fieldBase,
        message:
          'El email debe tener el formato correspondiente (ej: usuario@gmail.com).',
      };
    }
  }
  return null;
};
