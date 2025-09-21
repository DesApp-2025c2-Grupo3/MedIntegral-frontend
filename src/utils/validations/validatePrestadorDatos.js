export const validatePrestadorDatos = (data) => {
  if (!data.nombre) {
    return {
      field: 'nombre',
      message: 'El nombre es obligatorio.',
    };
  }

  // Verifica si el nombre contiene algún número
  const tieneNumeros = data.nombre
    .split('')
    .some((char) => !isNaN(char) && char !== ' ');
  if (tieneNumeros) {
    return {
      field: 'nombre',
      message: 'El nombre no puede contener números.',
    };
  }

  if (!data.cuilCuit) {
    return {
      field: 'cuilCuit',
      message: 'El CUIL o CUIT es obligatorio.',
    };
  }

  // Verifica si el CUIL/CUIT contiene alguna letra
  const tieneLetras = data.cuilCuit.split('').some((char) => isNaN(char));
  if (tieneLetras) {
    return {
      field: 'cuilCuit',
      message: 'El CUIL o CUIT no puede contener letras.',
    };
  }

  return null;
};
