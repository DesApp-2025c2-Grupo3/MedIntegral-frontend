import api from './api';
import {
  formatGrupoFamiliar,
  formatAfiliadoData,
} from '../utils/formats/afiliadoPayload';
import { formatAfiliadosListado } from '../utils/formats/afiliadoListado';

export const createAfiliado = async (afiliadoData) => {
  const grupoFamiliarFormateado = formatGrupoFamiliar(
    afiliadoData.grupoFamiliar,
    {
      vigenciaInicio: afiliadoData.vigenciaInicio,
      vigenciaFin: afiliadoData.vigenciaFin,
      direcciones: afiliadoData.direcciones,
    }
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

    if (!data) {
      throw new Error(
        'La respuesta del servidor no incluye el ID del afiliado creado'
      );
    }
    return { id: data };
  } catch (err) {
    console.error('Error al crear el afiliado:', err);
    throw err;
  }
};

/*
 * Obtener listado de los afiliados titulares con filtros y paginación
 */
export const getTitulares = async (params = {}) => {
  try {
    const response = await api.get('/afiliados', { params });
    return formatAfiliadosListado(response.data);
  } catch (err) {
    console.error('Error al obtener listado de afiliados:', err);
    throw err;
  }
};
