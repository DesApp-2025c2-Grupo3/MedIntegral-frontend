import { validateHorarioBasico } from './validateHorarios';

export const validateLugarAtencionEditModal = (centros) => {
  if (!centros || centros.length === 0) {
    return { field: 'centro-0', message: 'Debe existir al menos un centro.' };
  }

  for (let c of centros) {
    const baseCentro = `centro-${c.id}`;

    if (!c.direccion?.calle) {
      return { field: `${baseCentro}-calle`, message: 'Ingresá la calle.' };
    }

    if (!c.direccion?.altura) {
      return { field: `${baseCentro}-altura`, message: 'Ingresá la altura.' };
    }

    if (!c.direccion?.localidad) {
      return {
        field: `${baseCentro}-localidad`,
        message: 'Ingresá la localidad.',
      };
    }

    if (!c.direccion?.provincia) {
      return {
        field: `${baseCentro}-provincia`,
        message: 'Seleccioná la provincia.',
      };
    }

    if (!c.horarios || c.horarios.length === 0) {
      return {
        field: `${baseCentro}-horarios`,
        message: 'Agregá al menos un horario.',
      };
    }

    for (const h of c.horarios) {
      const bh = validateHorarioBasico(h);
      if (bh) {
        return {
          field: `horario-${h.id}-${bh.field.split('-').pop()}`,
          message: bh.message,
        };
      }
    }
  }

  return null;
};
