export const validateEspecialidad = (especialidad) => {
  if (!especialidad) {
    return {
      field: 'especialidad',
      message: 'Debe seleccionar una especialidad',
    };
  }
  return null;
};
