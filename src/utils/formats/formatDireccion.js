export const formatDireccion = (dir) => {
  if (!dir) return '';

  const partes = [];

  if (dir.calle) partes.push(dir.calle.trim());
  if (dir.altura) partes.push(String(dir.altura).trim());
  if (dir.pisoDepto) partes.push(dir.pisoDepto.trim());
  if (dir.localidad) partes.push(dir.localidad.trim());
  if (dir.provincia) partes.push(dir.provincia.trim());

  return partes.join(', ');
};
