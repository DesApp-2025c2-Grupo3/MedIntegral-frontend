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

//TODO: Dinámico para obtener los ids dinámicos
export const DIAS_SEMANA = [
  { id: 1, nombre: 'lunes', label: 'Lunes' },
  { id: 2, nombre: 'martes', label: 'Martes' },
  { id: 3, nombre: 'miercoles', label: 'Miércoles' },
  { id: 4, nombre: 'jueves', label: 'Jueves' },
  { id: 5, nombre: 'viernes', label: 'Viernes' },
  { id: 6, nombre: 'sabado', label: 'Sábado' },
  { id: 7, nombre: 'domingo', label: 'Domingo' },
];

export const diaToBackend = (nombre) => ({
  id: DIAS_SEMANA.indexOf(nombre) + 1,
  nombre: nombre,
});
