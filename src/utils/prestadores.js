const generateId = () => crypto.randomUUID?.();

export const newHorario = () => ({
  id: generateId(),
  dias: [],
  horaInicio: null,
  horaFin: null,
});

export const newCentroDeAtencion = () => ({
  id: generateId(),
  calle: '',
  altura: '',
  pisoDepto: '',
  codigoPostal: '',
  localidad: '',
  provincia: null,
  horarios: [newHorario()],
});

export const DIAS_SEMANA = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export const diaToBackend = (nombre) => ({
  id: DIAS_SEMANA.indexOf(nombre) + 1,
  nombre: nombre,
});
