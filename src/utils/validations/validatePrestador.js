export const validatePrestador = (prestador) => {
  if (!prestador) {
    return { field: 'prestador', message: 'Debe seleccionar un prestador' };
  }
  return null;
};
