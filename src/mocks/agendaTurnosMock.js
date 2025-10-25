export const agendaTurnosMock = {
  id: 20,
  prestador: {
    id: 1,
    nombre: 'Clínica Olivos',
    especialidades: [
      {
        id: 1,
        nombre: 'Gastroenterología',
      },
      {
        id: 2,
        nombre: 'Pediatría',
      },
    ],
    horariosAtencion: [
      {
        dia: { id: 1, nombre: 'Lunes' },
        horaInicio: '09:00',
        horaFin: '12:00',
      },
      {
        dia: { id: 3, nombre: 'Miércoles' },
        horaInicio: '9:00',
        horaFin: '12:00',
      },
      {
        dia: { id: 3, nombre: 'Miércoles' },
        horaInicio: '14:00',
        horaFin: '18:00',
      },
      {
        dia: { id: 4, nombre: 'Jueves' },
        horaInicio: '14:00',
        horaFin: '18:00',
      },
    ],
  },
  especialidad: 'Gastroenterología',
  horariosAtencion: [
    {
      dias: ['Lunes', 'Miércoles'],
      horaInicio: '09:00',
      horaFin: '12:00',
      duracion: 30,
    },
  ],
  direccion: {
    calle: 'Corrientes',
    altura: 450,
    pisoDepto: null,
    localidad: 'Olivos',
    provincia: 'Buenos Aires',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
