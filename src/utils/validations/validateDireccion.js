const REGEX_NUMERIC_MIN_2 = /^\d{2,}$/; //mínimo 2 dígitos
const REGEX_CALLE_ALPHANUMERIC = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\d]{3,}$/; //letras, números. Mínimo 3 caracteres.

// para agenda de turnos
export const validateDireccion = (direccion) => {
  if (!direccion) {
    return { field: 'direccion', message: 'Debe seleccionar una dirección' };
  }
  return null;
};

/**
 * Valida un solo objeto de dirección (para Centros de Atención o Dirección del Afiliado).
 */
export const validateSingleDireccion = (direccion, id) => {
  const prefijo = id ? `${id}-` : '';

  // Calle -> mínimo 3 caracteres alfanuméricos
  if (!direccion.calle) {
    return {
      field: `${prefijo}calle`,
      message: 'La calle es obligatoria.',
    };
  }

  if (!REGEX_CALLE_ALPHANUMERIC.test(direccion.calle)) {
    return {
      field: `${prefijo}calle`,
      message:
        'La calle debe tener al menos 3 caracteres y puede contener números.',
    };
  }

  // Altura -> mínimo 2 dígitos

  if (!direccion.altura) {
    return { field: `${prefijo}altura`, message: 'La altura es obligatoria.' };
  }
  if (!REGEX_NUMERIC_MIN_2.test(String(direccion.altura))) {
    return {
      field: `${prefijo}altura`,
      message: 'La altura debe ser numérica (Mín. 2 dígitos).',
    };
  }

  // Código postal -> mínimo 4 dígitos
  if (!direccion.codigoPostal) {
    return {
      field: `${prefijo}codigoPostal`,
      message: 'El código postal es obligatorio.',
    };
  }
  if (!/^\d{4,}$/.test(String(direccion.codigoPostal))) {
    return {
      field: `${prefijo}codigoPostal`,
      message: 'El código postal debe ser numérico (Mín. 4 dígitos).',
    };
  }

  if (!direccion.localidad) {
    return {
      field: `${prefijo}localidad`,
      message: 'La localidad es obligatoria.',
    };
  }

  if (!direccion.provincia || !direccion.provincia.id) {
    return {
      field: `provincia`,
      message: 'La provincia es obligatoria.',
    };
  }

  return null;
};

/**
 * Valida un array de direcciones.
 */
export const validateDireccionesArray = (direcciones) => {
  if (!direcciones || direcciones.length === 0) {
    return {
      field: 'direcciones',
      message: 'Debe agregar al menos una dirección.',
    };
  }

  for (const d of direcciones) {
    const error = validateSingleDireccion(d, `direccion-${d.id}`);
    if (error) return error;
  }
  return null;
};
