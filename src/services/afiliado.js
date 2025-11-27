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
export const deleteAfiliadoById = async (id, fechaBaja = null) => {
  try {
    const payload = fechaBaja ? { fechaBaja } : {};
    const response = await api.delete(`/afiliados/${id}`, { data: payload });

    if (response.status !== 200) {
      throw new Error(
        `Error al dar de baja el afiliado (status ${response.status})`
      );
    }
    return response.data;
  } catch (error) {
    console.error(`Error al dar de baja el afiliado ${id}:`, error);
    throw error;
  }
};

/**
 * Modificar fecha de baja existente
 */
export const modificarFechaBajaAfiliado = async (
  id,
  fechaBaja,
  aplicarAGrupoFamiliar = false
) => {
  try {
    const response = await api.put(`/afiliados/${id}/fecha-baja`, {
      fechaBaja,
      aplicarAGrupoFamiliar,
    });

    if (response.status !== 200) {
      throw new Error(
        `Error al modificar fecha de baja (status ${response.status})`
      );
    }
    return response.data;
  } catch (error) {
    console.error(
      `Error al modificar fecha de baja del afiliado ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Reincorporar afiliado
 */
export const reincorporarAfiliado = async (
  id,
  reincorporarGrupoFamiliar = false
) => {
  try {
    const response = await api.put(`/afiliados/${id}/reincorporar`, {
      reincorporarGrupoFamiliar,
    });

    if (response.status !== 200) {
      throw new Error(
        `Error al reincorporar afiliado (status ${response.status})`
      );
    }
    return response.data;
  } catch (error) {
    console.error(`Error al reincorporar afiliado ${id}:`, error);
    throw error;
  }
};

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
 * Obtener un afiliado por ID
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

/**
 * Obtener reporte de situaciones terapéuticas de un afiliado y su grupo familiar
 */
export const getReporteAfiliadoById = async (id) => {
  if (!id) {
    throw new Error('Se requiere un ID de afiliado');
  }

  try {
    const { data } = await api.get(`/afiliados/${id}/reporte`, {
      responseType: 'blob',
    });

    if (!data) {
      throw new Error(`Afiliado con ID ${id} no encontrado o formato inválido`);
    }

    return data;
  } catch (err) {
    console.error(`Error al obtener reporte del afiliado con ID ${id}:`, err);
    throw err;
  }
};

/**
 * Actualizar datos personales del afiliado
 */
export const updateAfiliadoDatosPersonales = async (id, payload) => {
  try {
    const response = await api.put(
      `/afiliados/${id}/datos-personales`,
      payload
    );

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar datos personales (status ${response.status})`
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error al actualizar datos personales del afiliado ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Actualizar cobertura del afiliado
 */
export const updateAfiliadoCobertura = async (id, payload) => {
  try {
    const response = await api.put(`/afiliados/${id}/plan-medico`, {
      planId: payload.planId,
    });

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar la cobertura (status ${response.status})`
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error al actualizar la cobertura del afiliado ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Actualizar datos de contacto del afiliado
 */
export const updateAfiliadoDatosContacto = async (id, payload) => {
  try {
    const response = await api.put(`/afiliados/${id}/datos-contacto`, payload);

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar datos de contacto (status ${response.status})`
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error al actualizar datos de contacto del afiliado ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Actualizar direcciones del afiliado
 */
export const updateAfiliadoDirecciones = async (id, payload) => {
  try {
    const response = await api.put(`/afiliados/${id}/direcciones`, payload);

    if (response.status !== 200) {
      throw new Error(
        `Error al actualizar las direcciones (status ${response.status})`
      );
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error al actualizar las direcciones del afiliado ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Agregar un miembro dependiente al afiliado
 */
export const addDependiente = async (idAfiliado, dependienteData) => {
  try {
    const { data } = await api.post(
      `/afiliados/${idAfiliado}/dependientes`,
      dependienteData
    );
    return data;
  } catch (error) {
    console.error('Error al agregar dependiente:', error);
    throw error;
  }
};
