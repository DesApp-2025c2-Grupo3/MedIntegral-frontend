import validateFiltrosAgendaTurnos from './validations/validateFiltrosAgendaTurnos.js';
import validateFiltrosPrestadores from './validations/validateFiltrosPrestadores.js';

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
      { name: 'horaInicio', label: 'Horario inicio', type: 'time' },
      { name: 'horaFin', label: 'Horario fin', type: 'time' },
      { name: 'creacionDesde', label: 'Creación desde', type: 'date' },
      { name: 'creacionHasta', label: 'Creación hasta', type: 'date' },
    ],
    validateFn: validateFiltrosAgendaTurnos,
  },

  prestador: {
    fields: [
      {
        name: 'tipoPrestador',
        label: 'Tipo de prestador',
        type: 'select',
        options: [
          { value: 'false', label: 'Médico' },
          { value: 'true', label: 'Centro médico' },
        ],
      },
      {
        name: 'especialidad',
        label: 'Especialidad',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/prestadores/especialidades',
      },
      {
        name: 'localidad',
        label: 'Localidad',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/prestadores/localidades',
      },
      {
        name: 'provincia',
        label: 'Provincia',
        type: 'select',
        options: [],
        asyncSearchUrl: '/api/prestadores/provincias',
      },
      { name: 'creacionDesde', label: 'Creación desde', type: 'date' },
      { name: 'creacionHasta', label: 'Creación hasta', type: 'date' },
    ],
    validateFn: validateFiltrosPrestadores,
  },

  afiliado: {
    fields: [
      { name: 'nombre', label: 'Nombre / Apellido', type: 'text' },
      { name: 'documento', label: 'Documento', type: 'text' },
      {
        name: 'tipoDocumento',
        label: 'Tipo de documento',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      { name: 'numeroDocumento', label: 'Nro de Documento', type: 'text' },
      { name: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
      {
        name: 'planMedico',
        label: 'Plan Médico',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      {
        name: 'provincia',
        label: 'Provincia',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      {
        name: 'localidad',
        label: 'Localidad',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      { name: 'telefono', label: 'Teléfono', type: 'text' },
      { name: 'email', label: 'E-mail', type: 'text' },
      {
        name: 'situacion',
        label: 'Situación terapéutica',
        type: 'select',
        options: [{ value: '', label: 'Seleccionar' }],
      },
      { name: 'vigenciaDesde', label: 'Vigencia desde', type: 'date' },
      { name: 'vigenciaHasta', label: 'Vigencia hasta', type: 'date' },
      {
        name: 'grupoFamiliar',
        label: '¿Tiene grupo familiar?',
        type: 'switch',
      },
    ],
    validateFn: null, // TODO
  },
};
