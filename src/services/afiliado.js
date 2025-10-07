import api from './api';

export const createAfiliado = async (afiliadoData) => {
  const payload = {
    ...afiliadoData,
    tipoDocumentoId: afiliadoData.tipoDocumento?.id,
  };

  if (
    !payload.tipoDocumentoId ||
    !afiliadoData?.numeroDocumento ||
    !afiliadoData?.nombre ||
    !afiliadoData?.apellido
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
