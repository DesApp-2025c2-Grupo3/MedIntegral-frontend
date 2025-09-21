export const prestador1DetalleMock = {
  id: 1,
  nombre: 'Dra. Tita Merello',
  cuilCuit: '27-12345678-9',
  esCentroMedico: false,

  especialidades: [
    { id: 1, nombre: 'Cardiología' },
    { id: 2, nombre: 'Clínica Médica' },
  ],

  emails: [
    { id: 1, direccion: 'tita.merello@hospital.com' },
    { id: 2, direccion: 'consultas@clinicamerello.com' },
  ],

  telefonos: [
    { id: 1, numero: '+54 11 4444-5555' },
    { id: 2, numero: '+54 11 6666-7777' },
  ],

  centrosDeAtencion: [
    {
      id: 1,
      calle: 'Av. Corrientes',
      altura: '1234',
      pisoDepto: '3B',
      codigoPostal: '1043',
      localidad: 'CABA',
      provincia: { id: 1, nombre: 'Buenos Aires' },
      horarios: [
        {
          id: 1,
          dia: { id: 1, nombre: 'Lunes' },
          horaInicio: '09:00',
          horaFin: '12:00',
        },
        {
          id: 2,
          dia: { id: 3, nombre: 'Miércoles' },
          horaInicio: '14:00',
          horaFin: '18:00',
        },
      ],
    },
    {
      id: 2,
      calle: 'Avenida Vergara',
      altura: '1908',
      pisoDepto: null,
      codigoPostal: '1708',
      localidad: 'Morón',
      provincia: { id: 1, nombre: 'Buenos Aires' },
      horarios: [
        {
          id: 3,
          dia: { id: 5, nombre: 'Viernes' },
          horaInicio: '10:00',
          horaFin: '13:00',
        },
      ],
    },
  ],

  agendaTurnos: [],
};
