export const validateDireccion = (direccion) => {
  if (!direccion) {
    return { field: 'direccion', message: 'Debe seleccionar una dirección' };
  }
  return null;
};
