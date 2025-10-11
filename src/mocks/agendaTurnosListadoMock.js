const allAgendas = [
  {
    id: 1,
    prestador: 'Clínica Modelo de Morón',
    especialidad: 'Cardiología',
    horarios: ['Lunes 10hs - 20hs', 'Martes 10hs - 18hs'],
    direccion: 'Av. Rivadavia 8900, Morón, Buenos Aires',
    duracion: '25 minutos',
  },
  {
    id: 2,
    prestador: 'Clínica Modelo de Morón',
    especialidad: 'Obstetricia',
    horarios: ['Miércoles 8hs - 17hs'],
    direccion: 'Av. Rivadavia 8900, Morón, Buenos Aires',
    duracion: '30 minutos',
  },
  {
    id: 3,
    prestador: 'Clínica Mariano Moreno',
    especialidad: 'Pediatría',
    horarios: [
      'Lunes 8hs - 12hs',
      'Martes 8hs - 12hs',
      'Miércoles 10hs - 14hs',
    ],
    direccion: 'Av. San Martín 1234, Moreno, Buenos Aires',
    duracion: '20 minutos',
  },
  {
    id: 4,
    prestador: 'Dr. Sigmund Freud',
    especialidad: 'Psiquiatría',
    horarios: ['Martes 18hs - 22hs', 'Jueves 14hs - 20hs'],
    direccion: 'Av. Boulogne 5678, Boulogne, Buenos Aires',
    duracion: '10 minutos',
  },
  {
    id: 5,
    prestador: 'Hospital Italiano',
    especialidad: 'Dermatología',
    horarios: ['Lunes 8hs - 16hs', 'Miércoles 9hs - 15hs'],
    direccion: 'Gascón 450, CABA',
    duracion: '20 minutos',
  },
  {
    id: 6,
    prestador: 'Sanatorio Las Lomas',
    especialidad: 'Traumatología',
    horarios: ['Martes 10hs - 18hs', 'Jueves 8hs - 16hs'],
    direccion: 'Italia 1550, San Isidro, Buenos Aires',
    duracion: '25 minutos',
  },
  {
    id: 7,
    prestador: 'Centro Médico Ramos',
    especialidad: 'Clínica Médica',
    horarios: ['Lunes a Viernes 8hs - 14hs'],
    direccion: 'Av. de Mayo 123, Ramos Mejía, Buenos Aires',
    duracion: '30 minutos',
  },
  {
    id: 8,
    prestador: 'Clínica San Justo',
    especialidad: 'Ginecología',
    horarios: ['Lunes y Miércoles 9hs - 17hs'],
    direccion: 'Av. Illia 789, San Justo, Buenos Aires',
    duracion: '20 minutos',
  },
  {
    id: 9,
    prestador: 'Hospital Austral',
    especialidad: 'Neurología',
    horarios: ['Martes 8hs - 13hs', 'Viernes 10hs - 16hs'],
    direccion: 'Av. Juan Domingo Perón 1500, Pilar, Buenos Aires',
    duracion: '25 minutos',
  },
  {
    id: 10,
    prestador: 'Clínica del Sol',
    especialidad: 'Oftalmología',
    horarios: ['Miércoles 9hs - 17hs'],
    direccion: 'Av. Santa Fe 4800, Palermo, CABA',
    duracion: '15 minutos',
  },
  {
    id: 11,
    prestador: 'Hospital Posadas',
    especialidad: 'Neumonología',
    horarios: ['Lunes 8hs - 12hs', 'Miércoles 10hs - 14hs'],
    direccion: 'Av. Illia y Marconi, El Palomar, Buenos Aires',
    duracion: '25 minutos',
  },
  {
    id: 12,
    prestador: 'Dr. Carlos Diol',
    especialidad: 'Otorrinolaringología',
    horarios: ['Martes 14hs - 20hs', 'Viernes 8hs - 13hs'],
    direccion: 'Av. Rivadavia 12000, Liniers, CABA',
    duracion: '20 minutos',
  },
  {
    id: 13,
    prestador: 'Clínica San Fernando',
    especialidad: 'Urología',
    horarios: ['Martes y Jueves 9hs - 17hs'],
    direccion: 'Constitución 760, San Fernando, Buenos Aires',
    duracion: '30 minutos',
  },
  {
    id: 14,
    prestador: 'Sanatorio Anchorena',
    especialidad: 'Cardiología',
    horarios: ['Lunes 10hs - 18hs', 'Viernes 9hs - 15hs'],
    direccion: 'Pueyrredón 1640, CABA',
    duracion: '25 minutos',
  },
  {
    id: 15,
    prestador: 'Dra. Lucía Pérez',
    especialidad: 'Endocrinología',
    horarios: ['Lunes 9hs - 13hs', 'Jueves 10hs - 18hs'],
    direccion: 'Av. Libertador 5200, Belgrano, CABA',
    duracion: '20 minutos',
  },
  {
    id: 16,
    prestador: 'Centro Médico Norte',
    especialidad: 'Reumatología',
    horarios: ['Martes 8hs - 12hs', 'Viernes 12hs - 16hs'],
    direccion: 'Av. Roca 2300, Munro, Buenos Aires',
    duracion: '30 minutos',
  },
  {
    id: 17,
    prestador: 'Dr. Pablo González',
    especialidad: 'Kinesiología',
    horarios: ['Lunes a Viernes 9hs - 18hs'],
    direccion: 'Mitre 6700, Wilde, Buenos Aires',
    duracion: '45 minutos',
  },
  {
    id: 18,
    prestador: 'Clínica Santa Isabel',
    especialidad: 'Pediatría',
    horarios: ['Lunes 8hs - 14hs', 'Miércoles 10hs - 18hs'],
    direccion: 'Av. Directorio 3500, CABA',
    duracion: '20 minutos',
  },
  {
    id: 19,
    prestador: 'Hospital Español',
    especialidad: 'Dermatología',
    horarios: ['Martes 10hs - 18hs'],
    direccion: 'Av. Belgrano 2975, CABA',
    duracion: '25 minutos',
  },
  {
    id: 20,
    prestador: 'Clínica Olivos',
    especialidad: 'Gastroenterología',
    horarios: ['Lunes y Miércoles 8hs - 15hs'],
    direccion: 'Corrientes 450, Olivos, Buenos Aires',
    duracion: '30 minutos',
  },
];

const unique = (arr) => [...new Set(arr.filter(Boolean))];

const dias = unique(
  allAgendas.flatMap((a) =>
    a.horarios.flatMap((h) =>
      h
        .replace('a ', '')
        .split(' ')
        .filter((w) =>
          [
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
          ].includes(w)
        )
    )
  )
);

const provincias = unique(allAgendas.map((a) => a.direccion.split(', ').pop()));
const localidades = unique(
  allAgendas.map((a) => a.direccion.split(', ').slice(-2, -1)[0])
);

export function searchAgendaTurnosMock(filters = {}, page = 1, limit = 10) {
  const text = (filters.textInputSearch || '').toLowerCase();

  const filtered = allAgendas.filter((a) => {
    if (
      text &&
      !a.prestador.toLowerCase().includes(text) &&
      !a.especialidad.toLowerCase().includes(text)
    )
      return false;
    if (filters.provincia && !a.direccion.includes(filters.provincia))
      return false;
    if (filters.localidad && !a.direccion.includes(filters.localidad))
      return false;
    if (filters.dia && !a.horarios.some((h) => h.includes(filters.dia)))
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
