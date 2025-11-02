export const prestador1DetalleMock = {
  id: 1,
  nombre: 'Dr. Pepe Grillo',
  cuilCuit: '12345678901',
  esCentroMedico: false,
  integraCentroMedico: false,
  centroMedicoId: null,
  Emails: [
    {
      direccion: 'pepeg@gmail.com',
    },
    {
      direccion: 'drgrillo@gmail.com',
    },
  ],
  Telefonos: [
    {
      numero: '1234567890',
    },
    {
      numero: '0123456789',
    },
  ],
  Especialidad: [
    {
      nombre: 'Cardiología',
    },
    {
      nombre: 'Dermatología',
    },
  ],
  CentroDeAtencion: [
    {
      id: 1,
      direccionId: 1,
      prestadorId: 1,
      Direccion: {
        calle: 'Avenida Siempre Viva',
        altura: 123,
        pisoDepto: null,
        localidad: 'Tigre',
        Provincia: {
          nombre: 'Buenos Aires',
        },
      },
      Horarios: [
        {
          id: 5,
          horaInicio: '08:00',
          horaFin: '18:00',
          duracionTurno: null,
          dia: 'Jueves',
          createdAt: '2025-11-01T00:40:33.682Z',
          updatedAt: '2025-11-01T00:40:33.682Z',
          agendaTurnosId: null,
          lugarAtencionId: 1,
        },
        {
          id: 4,
          horaInicio: '08:00',
          horaFin: '18:00',
          duracionTurno: null,
          dia: 'Martes',
          createdAt: '2025-11-01T00:40:33.680Z',
          updatedAt: '2025-11-01T00:40:33.680Z',
          agendaTurnosId: null,
          lugarAtencionId: 1,
        },
        {
          id: 3,
          horaInicio: '08:00',
          horaFin: '12:00',
          duracionTurno: null,
          dia: 'Viernes',
          createdAt: '2025-11-01T00:40:33.678Z',
          updatedAt: '2025-11-01T00:40:33.678Z',
          agendaTurnosId: null,
          lugarAtencionId: 1,
        },
        {
          id: 2,
          horaInicio: '08:00',
          horaFin: '12:00',
          duracionTurno: null,
          dia: 'Miércoles',
          createdAt: '2025-11-01T00:40:33.676Z',
          updatedAt: '2025-11-01T00:40:33.676Z',
          agendaTurnosId: null,
          lugarAtencionId: 1,
        },
        {
          id: 1,
          horaInicio: '08:00',
          horaFin: '12:00',
          duracionTurno: null,
          dia: 'Lunes',
          createdAt: '2025-11-01T00:40:33.673Z',
          updatedAt: '2025-11-01T00:40:33.673Z',
          agendaTurnosId: null,
          lugarAtencionId: 1,
        },
      ],
    },
  ],
};
