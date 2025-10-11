import dayjs from 'dayjs';
const generateId = () => crypto.randomUUID?.();

export const newSituacionTerapeutica = () => ({
  id: generateId(),
  situacion: null,
  fechaInicio: dayjs(),
  finaliza: false,
  fechaFin: null,
});
