import dayjs from 'dayjs';
import {
  validateHorarioBasico,
  validateHorarioDentroDireccion,
  validateDuracionVsRango,
  validateSolapamiento,
} from './validateHorarios';

export const validateHorarios = (horarios, direccion) => {
  if (!Array.isArray(horarios) || horarios.length === 0) {
    return 'Debe definir al menos un horario de atención';
  }

  for (const horario of horarios) {
    const inicio = dayjs(horario.horaInicio, 'HH:mm');
    const fin = dayjs(horario.horaFin, 'HH:mm');

    const horarioNormalizado = { ...horario, inicio, fin };

    const basico = validateHorarioBasico(horarioNormalizado);
    if (basico) return basico.message;

    const duracionVsRango = validateDuracionVsRango(horarioNormalizado);
    if (duracionVsRango) return duracionVsRango.message;

    const dentroDireccion = validateHorarioDentroDireccion(
      horarioNormalizado,
      direccion || { horarios: [] }
    );
    if (dentroDireccion) return dentroDireccion.message;

    const solapamiento = validateSolapamiento(
      horarioNormalizado,
      horarios.map((h) => ({
        ...h,
        inicio: dayjs(h.horaInicio, 'HH:mm'),
        fin: dayjs(h.horaFin, 'HH:mm'),
      }))
    );
    if (solapamiento) return solapamiento.message;
  }

  return null;
};
