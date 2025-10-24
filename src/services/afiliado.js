import api from './api';
import {
  formatGrupoFamiliar,
  formatAfiliadoData,
} from '../utils/formats/afiliadoPayload';

export const createAfiliado = async (afiliadoData) => {
  const grupoFamiliarFormateado = formatGrupoFamiliar(
    afiliadoData.grupoFamiliar
  );

  const payload = {
    ...formatAfiliadoData(afiliadoData),
    planId: afiliadoData.cobertura?.id,
    tieneGrupoFamiliar:
      afiliadoData.tieneGrupoFamiliar || grupoFamiliarFormateado.length > 0,
    grupoFamiliar: grupoFamiliarFormateado,
  };

  if (
    !payload.tipoDocumentoId ||
    !payload.numeroDocumento ||
    !payload.nombre ||
    !payload.apellido ||
    !payload?.fechaNacimiento ||
    !payload?.planId ||
    !payload?.vigenciaInicio
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
