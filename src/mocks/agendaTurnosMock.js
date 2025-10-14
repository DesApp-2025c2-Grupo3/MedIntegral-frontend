export const agendaTurnosMock = {
  id: 'mock-agenda-1234',
  prestadorId: 1,
  especialidadId: 2,
  lugaratencionId: 2,
  horarios: [
    {
      id: 'mock-horario-1',
      dias: ['Lunes', 'Miércoles'],
      duracion: 30,
      inicio: '09:00',
      fin: '12:00',
    },
  ],
  createdAt: new Date().toISOString(),
};
