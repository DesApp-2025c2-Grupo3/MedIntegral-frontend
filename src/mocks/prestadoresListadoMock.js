const prestadores = [
  {
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
      { id: 1, numero: '11 4444-5555' },
      { id: 2, numero: '11 6666-7777' },
    ],

    centrosDeAtencion: [
      {
        id: 1,
        calle: 'Av. Corrientes',
        altura: '1234',
        localidad: 'CABA',
        provincia: 'Buenos Aires',
      },
      {
        id: 2,
        calle: 'Avenida Vergara',
        altura: '1908',
        localidad: 'Morón',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '25/11/2024',
  },
  {
    id: 2,
    nombre: 'Dr. Juan Pérez',
    cuilCuit: '20-23456789-0',
    esCentroMedico: false,

    especialidades: [
      { id: 2, nombre: 'Clínica Médica' },
      { id: 4, nombre: 'Medicina General' },
    ],

    emails: [{ id: 3, direccion: 'juan.perez@clinica.com' }],

    telefonos: [{ id: 3, numero: '11 5555-8888' }],

    centrosDeAtencion: [
      {
        id: 3,
        calle: 'Ing. Sagasta',
        altura: '123',
        localidad: 'Vicente López',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '01/04/2024',
  },
  {
    id: 3,
    nombre: 'Centro Médico San Martín',
    cuilCuit: '30-34567890-1',
    esCentroMedico: true,

    especialidades: [
      { id: 1, nombre: 'Cardiología' },
      { id: 3, nombre: 'Pediatría' },
      { id: 5, nombre: 'Dermatología' },
    ],

    emails: [{ id: 4, direccion: 'info@centrosanmartin.com' }],

    telefonos: [{ id: 4, numero: '11 4000-3000' }],

    centrosDeAtencion: [
      {
        id: 4,
        calle: 'Av. San Martín',
        altura: '2345',
        localidad: 'San Martín',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '10/03/2024',
  },
  {
    id: 4,
    nombre: 'Dra. Laura Gómez',
    cuilCuit: '27-45678901-2',
    esCentroMedico: false,

    especialidades: [{ id: 6, nombre: 'Ginecología' }],

    emails: [{ id: 5, direccion: 'laura.gomez@ginecologia.com' }],

    telefonos: [{ id: 5, numero: '11 7777-9999' }],

    centrosDeAtencion: [
      {
        id: 5,
        calle: 'Av. Cabildo',
        altura: '3500',
        localidad: 'Belgrano',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '12/07/2024',
  },
  {
    id: 5,
    nombre: 'Centro de Salud del Oeste',
    cuilCuit: '30-56789012-3',
    esCentroMedico: true,

    especialidades: [
      { id: 2, nombre: 'Clínica Médica' },
      { id: 4, nombre: 'Medicina General' },
      { id: 7, nombre: 'Diabetología' },
    ],

    emails: [{ id: 6, direccion: 'contacto@saludoeste.com' }],

    telefonos: [{ id: 6, numero: '11 4800-6000' }],

    centrosDeAtencion: [
      {
        id: 6,
        calle: 'Rivadavia',
        altura: '9999',
        localidad: 'Haedo',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '22/02/2024',
  },
  {
    id: 6,
    nombre: 'Dr. Pablo Rodríguez',
    cuilCuit: '20-67890123-4',
    esCentroMedico: false,

    especialidades: [{ id: 1, nombre: 'Cardiología' }],

    emails: [{ id: 7, direccion: 'p.rodriguez@cardio.com' }],

    telefonos: [{ id: 7, numero: '11 3333-2222' }],

    centrosDeAtencion: [
      {
        id: 7,
        calle: 'Av. Libertador',
        altura: '8000',
        localidad: 'Nuñez',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '14/01/2024',
  },
  {
    id: 7,
    nombre: 'Clínica Central Norte',
    cuilCuit: '30-78901234-5',
    esCentroMedico: true,

    especialidades: [
      { id: 2, nombre: 'Clínica Médica' },
      { id: 8, nombre: 'Oncología' },
    ],

    emails: [{ id: 8, direccion: 'info@centralnorte.com' }],

    telefonos: [{ id: 8, numero: '11 5000-6000' }],

    centrosDeAtencion: [
      {
        id: 8,
        calle: 'Av. Maipú',
        altura: '1200',
        localidad: 'Olivos',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '30/08/2024',
  },
  {
    id: 8,
    nombre: 'Dra. Julieta Torres',
    cuilCuit: '27-89012345-6',
    esCentroMedico: false,

    especialidades: [
      { id: 5, nombre: 'Dermatología' },
      { id: 2, nombre: 'Clínica Médica' },
    ],

    emails: [{ id: 9, direccion: 'julieta.torres@derma.com' }],

    telefonos: [{ id: 9, numero: '11 2222-1111' }],

    centrosDeAtencion: [
      {
        id: 9,
        calle: 'Av. Santa Fe',
        altura: '4321',
        localidad: 'Palermo',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '03/09/2024',
  },
  {
    id: 9,
    nombre: 'Centro Integral de Pediatría',
    cuilCuit: '30-90123456-7',
    esCentroMedico: true,

    especialidades: [{ id: 3, nombre: 'Pediatría' }],

    emails: [{ id: 10, direccion: 'info@pediatriaintegral.com' }],

    telefonos: [{ id: 10, numero: '11 6500-4400' }],

    centrosDeAtencion: [
      {
        id: 10,
        calle: 'Av. Belgrano',
        altura: '2700',
        localidad: 'CABA',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '05/05/2024',
  },
  {
    id: 10,
    nombre: 'Dr. Ricardo Luna',
    cuilCuit: '20-01234567-8',
    esCentroMedico: false,

    especialidades: [{ id: 9, nombre: 'Fonoaudiología' }],

    emails: [{ id: 11, direccion: 'ricardo.luna@fonoaudiologia.com' }],

    telefonos: [{ id: 11, numero: '11 9000-8888' }],

    centrosDeAtencion: [
      {
        id: 11,
        calle: 'Av. Callao',
        altura: '1500',
        localidad: 'CABA',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '19/06/2024',
  },
  {
    id: 11,
    nombre: 'Clínica del Parque',
    cuilCuit: '30-11112222-3',
    esCentroMedico: true,

    especialidades: [
      { id: 4, nombre: 'Medicina General' },
      { id: 6, nombre: 'Ginecología' },
    ],

    emails: [{ id: 12, direccion: 'contacto@clinicadelparque.com' }],

    telefonos: [{ id: 12, numero: '11 4700-3333' }],

    centrosDeAtencion: [
      {
        id: 12,
        calle: 'Av. San Juan',
        altura: '4100',
        localidad: 'Boedo',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '07/10/2024',
  },
  {
    id: 12,
    nombre: 'Dr. Sergio Acosta',
    cuilCuit: '20-22223333-4',
    esCentroMedico: false,

    especialidades: [{ id: 7, nombre: 'Diabetología' }],

    emails: [{ id: 13, direccion: 'sergio.acosta@diabetes.com' }],

    telefonos: [{ id: 13, numero: '11 8777-5566' }],

    centrosDeAtencion: [
      {
        id: 13,
        calle: 'Mitre',
        altura: '2200',
        localidad: 'Avellaneda',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '15/01/2024',
  },
  {
    id: 13,
    nombre: 'Centro Médico del Sur',
    cuilCuit: '30-33334444-5',
    esCentroMedico: true,

    especialidades: [
      { id: 1, nombre: 'Cardiología' },
      { id: 8, nombre: 'Oncología' },
      { id: 5, nombre: 'Dermatología' },
    ],

    emails: [{ id: 14, direccion: 'info@centrosur.com' }],

    telefonos: [{ id: 14, numero: '11 4888-6655' }],

    centrosDeAtencion: [
      {
        id: 14,
        calle: 'Av. Pavón',
        altura: '5600',
        localidad: 'Lanús',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '11/11/2024',
  },
  {
    id: 14,
    nombre: 'Dra. Natalia Bustos',
    cuilCuit: '27-44445555-6',
    esCentroMedico: false,

    especialidades: [{ id: 6, nombre: 'Ginecología' }],

    emails: [{ id: 15, direccion: 'natalia.bustos@gine.com' }],

    telefonos: [{ id: 15, numero: '11 7600-9000' }],

    centrosDeAtencion: [
      {
        id: 15,
        calle: 'Juramento',
        altura: '2100',
        localidad: 'Belgrano',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '17/02/2024',
  },
  {
    id: 15,
    nombre: 'Instituto de Oncología Mitre',
    cuilCuit: '30-55556666-7',
    esCentroMedico: true,

    especialidades: [{ id: 8, nombre: 'Oncología' }],

    emails: [{ id: 16, direccion: 'contacto@oncologiamitre.com' }],

    telefonos: [{ id: 16, numero: '11 4900-4000' }],

    centrosDeAtencion: [
      {
        id: 16,
        calle: 'Mitre',
        altura: '4800',
        localidad: 'CABA',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '20/08/2024',
  },
  {
    id: 16,
    nombre: 'Dr. Andrés Molina',
    cuilCuit: '20-66667777-8',
    esCentroMedico: false,

    especialidades: [{ id: 4, nombre: 'Medicina General' }],

    emails: [{ id: 17, direccion: 'andres.molina@medgeneral.com' }],

    telefonos: [{ id: 17, numero: '11 4333-2222' }],

    centrosDeAtencion: [
      {
        id: 17,
        calle: 'Av. Córdoba',
        altura: '4500',
        localidad: 'Palermo',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '25/03/2024',
  },
  {
    id: 17,
    nombre: 'Centro Médico Belgrano',
    cuilCuit: '30-77778888-9',
    esCentroMedico: true,

    especialidades: [
      { id: 2, nombre: 'Clínica Médica' },
      { id: 3, nombre: 'Pediatría' },
      { id: 9, nombre: 'Fonoaudiología' },
    ],

    emails: [{ id: 18, direccion: 'info@centrobelgrano.com' }],

    telefonos: [{ id: 18, numero: '11 4200-3000' }],

    centrosDeAtencion: [
      {
        id: 18,
        calle: 'Av. Monroe',
        altura: '2800',
        localidad: 'Belgrano',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '14/06/2024',
  },
  {
    id: 18,
    nombre: 'Dra. Elisa Franco',
    cuilCuit: '27-88889999-0',
    esCentroMedico: false,

    especialidades: [
      { id: 3, nombre: 'Pediatría' },
      { id: 7, nombre: 'Diabetología' },
    ],

    emails: [{ id: 19, direccion: 'elisa.franco@pediatria.com' }],

    telefonos: [{ id: 19, numero: '11 5100-7000' }],

    centrosDeAtencion: [
      {
        id: 19,
        calle: 'Av. Congreso',
        altura: '1500',
        localidad: 'Villa Urquiza',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '29/07/2024',
  },
  {
    id: 19,
    nombre: 'Instituto Integral de la Mujer',
    cuilCuit: '30-99990000-1',
    esCentroMedico: true,

    especialidades: [
      { id: 6, nombre: 'Ginecología' },
      { id: 7, nombre: 'Diabetología' },
    ],

    emails: [{ id: 20, direccion: 'info@mujerintegral.com' }],

    telefonos: [{ id: 20, numero: '11 7000-1234' }],

    centrosDeAtencion: [
      {
        id: 20,
        calle: 'Av. Rivadavia',
        altura: '10200',
        localidad: 'Flores',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '02/04/2024',
  },
  {
    id: 20,
    nombre: 'Dr. Martín Suárez',
    cuilCuit: '20-10101010-2',
    esCentroMedico: false,

    especialidades: [{ id: 5, nombre: 'Dermatología' }],

    emails: [{ id: 21, direccion: 'martin.suarez@dermatologia.com' }],

    telefonos: [{ id: 21, numero: '11 6111-4444' }],

    centrosDeAtencion: [
      {
        id: 21,
        calle: 'Av. Scalabrini Ortiz',
        altura: '3300',
        localidad: 'Palermo',
        provincia: 'Buenos Aires',
      },
    ],

    agendaTurnos: [],
    createdAt: '18/09/2024',
  },
];

export default prestadores;
