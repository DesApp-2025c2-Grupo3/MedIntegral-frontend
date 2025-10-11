import dayjs from 'dayjs';
const generateId = () => crypto.randomUUID?.();

export const newSituacionTerapeutica = () => ({
  id: generateId(),
  situacion: null,
  fechaInicio: dayjs(),
  finaliza: false,
  fechaFin: null,
});

export const newDireccion = () => ({
  id: generateId(),
  calle: '',
  altura: '',
  pisoDepto: '',
  codigoPostal: '',
  localidad: '',
  provincia: null,
});
