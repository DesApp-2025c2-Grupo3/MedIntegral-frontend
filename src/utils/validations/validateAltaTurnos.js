import { validatePrestador } from './validatePrestador';
import { validateEspecialidad } from './validateEspecialidad';
import { validateDireccion } from './validateDireccion';
import {
  validateHorarioBasico,
  validateHorarioDentroDireccion,
  validateDuracionVsRango,
  validateSolapamiento,
} from './validateHorarios';

export const validateAltaTurnos = ({
  prestador,
  especialidad,
  direccion,
  horarios,
}) => {
  let error;

  error = validatePrestador(prestador);
  if (error) return error;

  error = validateEspecialidad(especialidad);
  if (error) return error;

  error = validateDireccion(direccion);
  if (error) return error;

  if (!horarios || horarios.length === 0) {
    return {
      field: 'horarios',
      message: 'Tenés que agregar al menos un horario',
    };
  }

  for (let i = 0; i < horarios.length; i++) {
    const h = horarios[i];

    error = validateHorarioBasico(h, i);
    if (error) return error;

    error = validateHorarioDentroDireccion(h, direccion, i);
    if (error) return error;

    error = validateDuracionVsRango(h, i);
    if (error) return error;

    error = validateSolapamiento(h, horarios, i);
    if (error) return error;
  }

  return null;
};
