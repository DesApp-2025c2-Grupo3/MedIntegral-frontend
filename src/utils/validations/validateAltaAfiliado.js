import {
  validateNombre,
  validateTelefonos,
  validateEmails,
  validateNumeroDocumento,
} from './validateContacto';
import { validateDireccionesArray } from './validateDireccion';
import { validateSituacionesTerapeuticasArray } from './validateSituacionesTerapeuticas';

const validateMiembroFamiliar = (miembro, index) => {
  let error;
  const prefijo = `grupoFamiliar-${index}-`;

  if (!miembro.parentesco)
    return {
      field: `${prefijo}parentesco`,
      message: 'El parentesco es obligatorio.',
    };

  if (!miembro.tipoDocumento)
    return {
      field: `${prefijo}tipoDocumento`,
      message: 'El tipo de documento es obligatorio.',
    };

  error = validateNumeroDocumento(
    miembro.numeroDocumento,
    `${prefijo}numeroDocumento`
  );
  if (error) return error;

  if (!miembro.fechaNacimiento)
    return {
      field: `${prefijo}fechaNacimiento`,
      message: 'La fecha de nacimiento es obligatoria.',
    };

  if (new Date(miembro.fechaNacimiento) > new Date())
    return {
      field: `${prefijo}fechaNacimiento`,
      message: 'La fecha de nacimiento no puede ser futura.',
    };

  error = validateNombre(miembro.nombre, `${prefijo}nombre`);
  if (error) return error;

  error = validateNombre(miembro.apellido, `${prefijo}apellido`);
  if (error) return error;

  if (!miembro.usaMismaVigenciaTitular) {
    if (!miembro.vigenciaInicio) {
      return {
        field: `${prefijo}vigenciaInicio`,
        message:
          'La fecha de inicio de vigencia es obligatoria para el miembro.',
      };
    }

    if (miembro.tieneFechaBaja && !miembro.vigenciaFin) {
      return {
        field: `${prefijo}vigenciaFin`,
        message:
          'La fecha de fin de vigencia es obligatoria si se marca la opción.',
      };
    }

    if (
      miembro.tieneFechaBaja &&
      miembro.vigenciaFin < miembro.vigenciaInicio
    ) {
      return {
        field: `${prefijo}vigenciaFin`,
        message:
          'La fecha de fin de vigencia no puede ser anterior a la de inicio.',
      };
    }
  }

  if (miembro.tieneSituacionTerapeutica) {
    error = validateSituacionesTerapeuticasArray(
      miembro.situacionesTerapeuticas,
      prefijo
    );
    if (error) return error;
  }

  error = validateTelefonos(miembro.telefonos, `${prefijo}telefonos`);
  if (error) return error;

  error = validateEmails(miembro.emails, `${prefijo}emails`);
  if (error) return error;

  if (!miembro.usaMismaDireccionTitular) {
    error = validateDireccionesArray(
      miembro.direcciones,
      `${prefijo}direcciones`
    );
    if (error) return error;
  }

  if (
    miembro.tieneSituacionTerapeutica &&
    (!miembro.situacionesTerapeuticas ||
      miembro.situacionesTerapeuticas.length === 0)
  ) {
    return {
      field: `${prefijo}situacionesTerapeuticas`,
      message: 'Tenés que agregar al menos una situación terapéutica.',
    };
  }

  return null;
};

export const validateAltaAfiliado = (data) => {
  let error;

  if (!data.tipoDocumento)
    return {
      field: 'tipoDocumento',
      message: 'El tipo de documento es obligatorio.',
    };

  error = validateNumeroDocumento(data.numeroDocumento, 'numeroDocumento');
  if (error) return error;

  error = validateNombre(data.nombre, 'nombre');
  if (error) return error;

  error = validateNombre(data.apellido, 'apellido');
  if (error) return error;

  if (!data.fechaNacimiento)
    return {
      field: 'fechaNacimiento',
      message: 'La fecha de nacimiento es obligatoria.',
    };

  if (new Date(data.fechaNacimiento) > new Date())
    return {
      field: 'fechaNacimiento',
      message: 'La fecha de nacimiento no puede ser futura.',
    };

  if (!data.cobertura)
    return {
      field: 'cobertura',
      message: 'El plan médico (cobertura) es obligatorio.',
    };

  if (!data.vigenciaInicio)
    return {
      field: 'vigenciaInicio',
      message: 'La fecha de inicio de vigencia es obligatoria.',
    };

  if (data.tieneFechaBaja) {
    if (!data.vigenciaFin) {
      return {
        field: 'vigenciaFin',
        message:
          'La fecha de fin de vigencia es obligatoria si se marca la opción.',
      };
    }

    if (data.vigenciaFin < data.vigenciaInicio) {
      return {
        field: 'vigenciaFin',
        message:
          'La fecha de fin de vigencia no puede ser anterior a la de inicio.',
      };
    }
  }

  if (data.tieneSituacionTerapeutica) {
    error = validateSituacionesTerapeuticasArray(data.situacionesTerapeuticas);
    if (error) return error;
  }

  error = validateTelefonos(data.telefonos);
  if (error) return error;

  error = validateEmails(data.emails);
  if (error) return error;

  error = validateDireccionesArray(data.direcciones);
  if (error) return error;

  if (
    data.tieneSituacionTerapeutica &&
    (!data.situacionesTerapeuticas || data.situacionesTerapeuticas.length === 0)
  ) {
    return {
      field: 'situacionesTerapeuticas',
      message: 'Tenés que agregar al menos una situación terapéutica.',
    };
  }

  if (data.tieneGrupoFamiliar) {
    if (!data.grupoFamiliar || data.grupoFamiliar.length === 0) {
      return {
        field: 'grupoFamiliar',
        message:
          'Tenés que agregar al menos un miembro si el switch está activado.',
      };
    }
    for (let i = 0; i < data.grupoFamiliar.length; i++) {
      error = validateMiembroFamiliar(data.grupoFamiliar[i], i, {
        vigenciaInicio: data.vigenciaInicio,
        vigenciaFin: data.vigenciaFin,
        direcciones: data.direcciones,
      });
      if (error) return error;
    }
  }

  return null;
};
