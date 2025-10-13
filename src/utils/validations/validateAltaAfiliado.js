import {
  validateNombre,
  validateTelefonos,
  validateEmails,
  validateNumeroDocumento,
} from './validateContacto';
import { validateDireccionesArray } from './validateDireccion';

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

  if (data.tieneFechaBaja && !data.vigenciaFin) {
    return {
      field: 'vigenciaFin',
      message:
        'La fecha de fin de vigencia es obligatoria si se marca la opción.',
    };
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
      message: 'Debe agregar al menos una situación terapéutica.',
    };
  }

  return null;
};
