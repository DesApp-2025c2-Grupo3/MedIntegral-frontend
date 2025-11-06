export const formatDireccion = (dir) => {
  if (!dir) return '';

  const partes = [];

  if (dir.calle && dir.altura) {
    partes.push(`${dir.calle.trim()} ${String(dir.altura).trim()}`);
  } else if (dir.calle) {
    partes.push(dir.calle.trim());
  } else if (dir.altura) {
    partes.push(String(dir.altura).trim());
  }

  if (dir.pisoDepto && dir.pisoDepto.trim()) {
    partes.push(`Piso/Depto ${dir.pisoDepto.trim()}`);
  }

  if (dir.localidad && dir.localidad.trim()) {
    partes.push(dir.localidad.trim());
  }

  const provinciaObj = dir.provincia || dir.Provincia;

  if (provinciaObj) {
    const provinciaStr =
      typeof provinciaObj === 'object'
        ? (provinciaObj.nombre ?? '').trim()
        : String(provinciaObj).trim();

    if (provinciaStr) partes.push(provinciaStr);
  }

  return partes.join(', ');
};
