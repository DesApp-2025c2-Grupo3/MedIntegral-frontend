import api from './api';

export const createAfiliado = async (afiliadoData) => {
  const payload = {
    ...afiliadoData,
    tipoDocumentoId: afiliadoData.tipoDocumento?.id,
    fechaNacimiento: afiliadoData.fechaNacimiento
      ? afiliadoData.fechaNacimiento.format('YYYY-MM-DD')
      : null,
    coberturaId: afiliadoData.cobertura?.id,
  };

  if (
    !payload.tipoDocumentoId ||
    !afiliadoData?.numeroDocumento ||
    !afiliadoData?.nombre ||
    !afiliadoData?.apellido ||
    !payload?.fechaNacimiento ||
    !payload?.coberturaId
  ) {
    throw new Error('Faltan datos obligatorios para crear el afiliado');
  }

  try {
    const { data } = await api.post('/afiliados', payload);

    if (!data?.id) {
      throw new Error(
        'La respuesta del servidor no incluye el ID del afiliado creado'
      );
    }
    return data;
  } catch (err) {
    console.error('Error al crear el afiliado:', err);
    throw err;
  }
};
