export const agendaTurnosMock = {
  id: 20,
  prestador: 'Clínica Olivos',
  especialidad: 'Gastroenterología',
  horariosAtencion: [
    {
      dias: ['Lunes', 'Miércoles'],
      horaInicio: '08:00',
      horaFin: '15:00',
      duracion: 30,
    },
    {
      dias: ['Jueves', 'Viernes', 'Sábado'],
      horaInicio: '08:30',
      horaFin: '16:00',
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
