export const detailHeaderConfig = {
  'agenda-de-turnos': {
    title: (id) => `Agenda de turnos #${id}`,
    subtitle: () => `Detalles con opción de edición`,
    deleteService: 'deleteAgendaTurnos',
    redirectTo: '/agenda-turnos/listado?deleted=true',
    deleteModal: {
      title: 'Dar de baja agenda',
      message: (id) =>
        `¿Estás seguro de dar de baja la agenda #${id}? Esta acción no se puede deshacer.`,
    },
  },

  prestador: {
    title: (id) => `Prestador #${id}`,
    subtitle: () => `Detalles con opción de edición`,
    deleteService: 'deletePrestador',
    redirectTo: '/prestadores/listado?deleted=true',
    deleteModal: {
      title: 'Eliminar prestador',
      message: (id) => `¿Seguro que deseas eliminar el prestador con ID ${id}?`,
    },
  },

  afiliado: {
    title: (id) => `Afiliado #${id}`,
    subtitle: () => `Detalles con opción de edición`,
    deleteService: 'deleteAfiliado',
    redirectTo: '/afiliados/listado?deleted=true',
    deleteModal: {
      title: 'Eliminar afiliado',
      message: (id) => `¿Seguro que deseas eliminar el afiliado con ID ${id}?`,
    },
  },
};
