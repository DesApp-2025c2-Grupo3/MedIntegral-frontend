import validateFiltrosAgendaTurnos from './validations/validateFiltrosAgendaTurnos.js';

export const filtrosConfig = {
  'agenda-de-turnos': {
    fields: [
      {
        name: 'provincia',
        label: 'Provincia',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/agenda-turnos/provincias',
      },
      {
        name: 'localidad',
        label: 'Localidad',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/agenda-turnos/localidades',
      },
      {
        name: 'dia',
        label: 'Día',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/agenda-turnos/dias',
      },
      { name: 'horarioInicio', label: 'Horario inicio', type: 'time' },
      { name: 'horarioFin', label: 'Horario fin', type: 'time' },
      { name: 'creacionDesde', label: 'Creación desde', type: 'date' },
      { name: 'creacionHasta', label: 'Creación hasta', type: 'date' },
    ],
    validateFn: validateFiltrosAgendaTurnos,
  },

  prestador: {
    fields: [
      { name: 'nombre', label: 'Nombre del prestador', type: 'text' },
      { name: 'cuit', label: 'CUIT/CUIL', type: 'text' },
      {
        name: 'tipoPrestador',
        label: 'Tipo de prestador',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      {
        name: 'especialidad',
        label: 'Especialidad',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      { name: 'centroAsociado', label: 'Centro médico asociado', type: 'text' },
      {
        name: 'localidad',
        label: 'Localidad',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      {
        name: 'provincia',
        label: 'Provincia',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      { name: 'creacionDesde', label: 'Creación desde', type: 'date' },
      { name: 'creacionHasta', label: 'Creación hasta', type: 'date' },
    ],
    validateFn: null, // TODO
  },

  afiliado: {
    fields: [
      {
        name: 'tipoDocumento',
        label: 'Tipo de documento',
        type: 'select',
        options: [
          { value: 1, label: 'DNI' },
          { value: 2, label: 'Pasaporte' },
          { value: 3, label: 'Libreta Cívica' },
        ],
      },
      { name: 'numeroDocumento', label: 'Nro de Documento', type: 'text' },
      { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
      {
        name: 'planMedico',
        label: 'Plan Médico',
        type: 'select',
        options: [
          { value: 1, label: '210' },
          { value: 2, label: '310' },
          { value: 3, label: '410' },
          { value: 4, label: '510' },
        ],
      },
      {
        name: 'provincia',
        label: 'Provincia',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/afiliados/provincias',
      },
      {
        name: 'localidad',
        label: 'Localidad',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/afiliados/localidades',
      },
      { name: 'telefono', label: 'Teléfono', type: 'text' },
      { name: 'email', label: 'E-mail', type: 'text' },
      { name: 'vigenciaDesde', label: 'Vigencia desde', type: 'date' },
      { name: 'vigenciaHasta', label: 'Vigencia hasta', type: 'date' },
    ],
    validateFn: null, // TODO
  },
};
