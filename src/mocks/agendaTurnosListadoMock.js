const allAgendas = [
  {
    id: 1,
    prestador: { id: 1, nombre: 'Clínica Modelo de Morón' },
    especialidad: { id: 1, nombre: 'Cardiología' },
    horarioAtencion: [
      { dias: ['Lunes'], horarioInicio: '10:00', horarioFin: '20:00' },
      { dias: ['Martes'], horarioInicio: '10:00', horarioFin: '18:00' },
    ],
    direccion: {
      calle: 'Av. Rivadavia',
      altura: 8900,
      pisoDepto: null,
      localidad: 'Morón',
      provincia: 'Buenos Aires',
    },
    duracion: 25,
  },
  {
    id: 2,
    prestador: 'Clínica Modelo de Morón',
    especialidad: 'Obstetricia',
    horarioAtencion: [
      { dias: ['Miércoles'], horarioInicio: '08:00', horarioFin: '17:00' },
    ],
    direccion: {
      calle: 'Av. Rivadavia',
      altura: 8900,
      pisoDepto: null,
      localidad: 'Morón',
      provincia: 'Buenos Aires',
    },
    duracion: 30,
  },
  {
    id: 3,
    prestador: 'Clínica Mariano Moreno',
    especialidad: 'Pediatría',
    horarioAtencion: [
      { dias: ['Lunes'], horarioInicio: '08:00', horarioFin: '12:00' },
      { dias: ['Martes'], horarioInicio: '08:00', horarioFin: '12:00' },
      { dias: ['Miércoles'], horarioInicio: '10:00', horarioFin: '14:00' },
    ],
    direccion: {
      calle: 'Av. San Martín',
      altura: 1234,
      pisoDepto: null,
      localidad: 'Moreno',
      provincia: 'Buenos Aires',
    },
    duracion: 20,
  },
  {
    id: 4,
    prestador: 'Dr. Sigmund Freud',
    especialidad: 'Psiquiatría',
    horarioAtencion: [
      { dias: ['Martes'], horarioInicio: '18:00', horarioFin: '22:00' },
      { dias: ['Jueves'], horarioInicio: '14:00', horarioFin: '20:00' },
    ],
    direccion: {
      calle: 'Av. Boulogne',
      altura: 5678,
      pisoDepto: null,
      localidad: 'Boulogne',
      provincia: 'Buenos Aires',
    },
    duracion: 10,
  },
  {
    id: 5,
    prestador: 'Hospital Italiano',
    especialidad: 'Dermatología',
    horarioAtencion: [
      { dias: ['Lunes'], horarioInicio: '08:00', horarioFin: '16:00' },
      { dias: ['Miércoles'], horarioInicio: '09:00', horarioFin: '15:00' },
    ],
    direccion: {
      calle: 'Gascón',
      altura: 450,
      pisoDepto: null,
      localidad: 'CABA',
      provincia: 'Buenos Aires',
    },
    duracion: 20,
  },
  {
    id: 6,
    prestador: 'Sanatorio Las Lomas',
    especialidad: 'Traumatología',
    horarioAtencion: [
      { dia: ['Martes'], horarioInicio: '10:00', horarioFin: '18:00' },
      { dia: ['Jueves'], horarioInicio: '08:00', horarioFin: '16:00' },
    ],
    direccion: {
      calle: 'Italia',
      altura: 1550,
      pisoDepto: null,
      localidad: 'San Isidro',
      provincia: 'Buenos Aires',
    },
    duracion: 25,
  },
  {
    id: 7,
    prestador: 'Centro Médico Ramos',
    especialidad: 'Clínica Médica',
    horarioAtencion: [
      {
        dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        horarioInicio: '08:00',
        horarioFin: '14:00',
      },
    ],
    direccion: {
      calle: 'Av. de Mayo',
      altura: 123,
      pisoDepto: null,
      localidad: 'Ramos Mejía',
      provincia: 'Buenos Aires',
    },
    duracion: 30,
  },
  {
    id: 8,
    prestador: 'Clínica San Justo',
    especialidad: 'Ginecología',
    horarioAtencion: [
      {
        dia: ['Lunes', 'Miércoles'],
        horarioInicio: '09:00',
        horarioFin: '17:00',
      },
    ],
    direccion: {
      calle: 'Av. Illia',
      altura: 789,
      pisoDepto: null,
      localidad: 'San Justo',
      provincia: 'Buenos Aires',
    },
    duracion: 20,
  },
  {
    id: 9,
    prestador: 'Hospital Austral',
    especialidad: 'Neurología',
    horarioAtencion: [
      { dia: ['Lunes'], horarioInicio: '12:00', horarioFin: '18:00' },
      { dia: ['Viernes'], horarioInicio: '13:00', horarioFin: '20:00' },
    ],
    direccion: {
      calle: 'Av. Juan Domingo Perón',
      altura: 1500,
      pisoDepto: null,
      localidad: 'Pilar',
      provincia: 'Buenos Aires',
    },
    duracion: 25,
  },
  {
    id: 10,
    prestador: 'Clínica del Sol',
    especialidad: 'Oftalmología',
    horarioAtencion: [
      { dia: ['Miércoles'], horarioInicio: '09:00', horarioFin: '17:00' },
    ],
    direccion: {
      calle: 'Av. Santa Fe',
      altura: 4800,
      pisoDepto: null,
      localidad: 'Palermo',
      provincia: 'CABA',
    },
    duracion: 15,
  },
  {
    id: 11,
    prestador: 'Hospital Posadas',
    especialidad: 'Neumonología',
    horarioAtencion: [
      { dia: ['Lunes'], horarioInicio: '08:00', horarioFin: '12:00' },
      { dia: ['Miércoles'], horarioInicio: '10:00', horarioFin: '14:00' },
    ],
    direccion: {
      calle: 'Av. Illia y Marconi',
      altura: null,
      pisoDepto: null,
      localidad: 'El Palomar',
      provincia: 'Buenos Aires',
    },
    duracion: 25,
  },
  {
    id: 12,
    prestador: 'Dr. Carlos Diol',
    especialidad: 'Otorrinolaringología',
    horarioAtencion: [
      { dia: ['Martes'], horarioInicio: '14:00', horarioFin: '20:00' },
      { dia: ['Viernes'], horarioInicio: '08:00', horarioFin: '13:00' },
    ],
    direccion: {
      calle: 'Av. Rivadavia',
      altura: 12000,
      pisoDepto: null,
      localidad: 'Liniers',
      provincia: 'CABA',
    },
    duracion: 20,
  },
  {
    id: 13,
    prestador: 'Clínica San Fernando',
    especialidad: 'Urología',
    horarioAtencion: [
      {
        dia: ['Martes', 'Jueves'],
        horarioInicio: '09:00',
        horarioFin: '17:00',
      },
    ],
    direccion: {
      calle: 'Constitución',
      altura: 760,
      pisoDepto: null,
      localidad: 'San Fernando',
      provincia: 'Buenos Aires',
    },
    duracion: 30,
  },
  {
    id: 14,
    prestador: 'Sanatorio Anchorena',
    especialidad: 'Cardiología',
    horarioAtencion: [
      { dia: ['Lunes'], horarioInicio: '10:00', horarioFin: '18:00' },
      { dia: ['Viernes'], horarioInicio: '09:00', horarioFin: '15:00' },
    ],
    direccion: {
      calle: 'Pueyrredón',
      altura: 1640,
      pisoDepto: null,
      localidad: 'CABA',
      provincia: 'Buenos Aires',
    },
    duracion: 25,
  },
  {
    id: 15,
    prestador: 'Dra. Lucía Pérez',
    especialidad: 'Endocrinología',
    horarioAtencion: [
      { dia: ['Lunes'], horarioInicio: '09:00', horarioFin: '13:00' },
      { dia: ['Jueves'], horarioInicio: '10:00', horarioFin: '18:00' },
    ],
    direccion: {
      calle: 'Av. Libertador',
      altura: 5200,
      pisoDepto: null,
      localidad: 'Belgrano',
      provincia: 'CABA',
    },
    duracion: 20,
  },
  {
    id: 16,
    prestador: 'Centro Médico Norte',
    especialidad: 'Reumatología',
    horarioAtencion: [
      { dia: ['Martes'], horarioInicio: '08:00', horarioFin: '12:00' },
      { dia: ['Viernes'], horarioInicio: '12:00', horarioFin: '16:00' },
    ],
    direccion: {
      calle: 'Av. Roca',
      altura: 2300,
      pisoDepto: null,
      localidad: 'Munro',
      provincia: 'Buenos Aires',
    },
    duracion: 30,
  },
  {
    id: 17,
    prestador: 'Dr. Pablo González',
    especialidad: 'Kinesiología',
    horarioAtencion: [
      {
        dia: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
        horarioInicio: '09:00',
        horarioFin: '18:00',
      },
    ],
    direccion: {
      calle: 'Mitre',
      altura: 6700,
      pisoDepto: null,
      localidad: 'Wilde',
      provincia: 'Buenos Aires',
    },
    duracion: 45,
  },
  {
    id: 18,
    prestador: 'Clínica Santa Isabel',
    especialidad: 'Pediatría',
    horarioAtencion: [
      { dia: ['Lunes'], horarioInicio: '08:00', horarioFin: '14:00' },
      { dia: ['Miércoles'], horarioInicio: '10:00', horarioFin: '18:00' },
    ],
    direccion: {
      calle: 'Av. Directorio',
      altura: 3500,
      pisoDepto: null,
      localidad: 'CABA',
      provincia: 'Buenos Aires',
    },
    duracion: 20,
  },
  {
    id: 19,
    prestador: 'Hospital Español',
    especialidad: 'Dermatología',
    horarioAtencion: [
      { dia: ['Martes'], horarioInicio: '10:00', horarioFin: '18:00' },
    ],
    direccion: {
      calle: 'Av. Belgrano',
      altura: 2975,
      pisoDepto: null,
      localidad: 'CABA',
      provincia: 'Buenos Aires',
    },
    duracion: 25,
  },
  {
    id: 20,
    prestador: 'Clínica Olivos',
    especialidad: 'Gastroenterología',
    horarioAtencion: [
      {
        dia: ['Lunes', 'Miércoles'],
        horarioInicio: '08:00',
        horarioFin: '15:00',
      },
    ],
    direccion: {
      calle: 'Corrientes',
      altura: 450,
      pisoDepto: null,
      localidad: 'Olivos',
      provincia: 'Buenos Aires',
    },
    duracion: 30,
  },
];

const unique = (arr) => [...new Set(arr.filter(Boolean))];

const dias = unique(
  allAgendas.flatMap((a) => a.horarioAtencion?.flatMap((h) => h.dia) || [])
);

const provincias = unique(allAgendas.map((a) => a.direccion?.provincia));
const localidades = unique(allAgendas.map((a) => a.direccion?.localidad));

export function searchAgendaTurnosMock(filters = {}, page = 1, limit = 10) {
  const text = (filters.textInputSearch || '').toLowerCase();

  const filtered = allAgendas.filter((a) => {
    if (
      text &&
      !a.prestador.toLowerCase().includes(text) &&
      !a.especialidad.toLowerCase().includes(text)
    )
      return false;
    if (
      filters.provincia &&
      a.direccion?.provincia?.toLowerCase() !== filters.provincia.toLowerCase()
    )
      return false;
    if (
      filters.localidad &&
      a.direccion?.localidad?.toLowerCase() !== filters.localidad.toLowerCase()
    )
      return false;
    if (
      filters.dia &&
      !a.horarioAtencion?.some((h) =>
        h.dia.some((d) => d.toLowerCase() === filters.dia.toLowerCase())
      )
    )
      return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const items = filtered.slice(start, end);

  return { items, total, page, limit };
}

const mapOptions = (arr) =>
  arr.map((nombre) => ({ value: nombre, label: nombre }));

export const agendaTurnosFiltrosMocks = {
  '/api/agenda-turnos/provincias': (search = '') =>
    mapOptions(
      provincias.filter((p) => p.toLowerCase().includes(search.toLowerCase()))
    ),
  '/api/agenda-turnos/localidades': (search = '') =>
    mapOptions(
      localidades.filter((l) => l.toLowerCase().includes(search.toLowerCase()))
    ),
  '/api/agenda-turnos/dias': (search = '') =>
    mapOptions(
      dias.filter((d) => d.toLowerCase().includes(search.toLowerCase()))
    ),
};
