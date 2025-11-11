import api from './api';
import {
  formatGrupoFamiliar,
  formatAfiliadoData,
} from '../utils/formats/afiliadoPayload';
import { formatAfiliadosListado } from '../utils/formats/afiliadoListado';
//import { formatAfiliadoDetalle } from '../utils/formats/afiliadoDetalle';

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

/**
 * Eliminar un afiliado
 */
export const deleteAfiliadoById = (id) => api.delete(`/afiliados/${id}`);

/*
 * Obtener listado de los afiliados titulares con filtros y paginación
 */
export const getTitulares = async (filters = {}, page = 0, limit = 10) => {
  try {
    const params = Object.fromEntries(
      Object.entries({
        ...filters,
        page: page + 1,
        limit,
      }).map(([key, val]) => [
        key,
        typeof val === 'object' ? val?.value || '' : val,
      ])
    );

    const { data } = await api.get('/afiliados', { params });
    return formatAfiliadosListado(data);
  } catch (err) {
    console.error('Error al obtener listado de afiliados:', err);
    throw err;
  }
};

/**
 * Obtener un prestador por ID
 */
export const getAfiliadoById = async (id) => {
  if (!id) {
    throw new Error('Se requiere un ID de afiliado');
  }

  try {
    const { data } = await api.get(`/afiliados/${id}`);

    if (!data || typeof data !== 'object') {
      throw new Error(`Afiliado con ID ${id} no encontrado o formato inválido`);
    }

    //const formatted = formatAfiliadoDetalle(data);
    //return formatted

    return data;
  } catch (err) {
    console.error(`Error al obtener afiliado con ID ${id}:`, err);
    throw err;
  }
};
