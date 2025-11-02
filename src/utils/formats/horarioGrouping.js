import { toMinutes } from './dateUtils';

export const buildDuraciones = () =>
  Array.from({ length: 24 }, (_, i) => (i + 1) * 5);

export const isWithin = (start, end, rangeStart, rangeEnd) => {
  const [s, e, rs, re] = [start, end, rangeStart, rangeEnd].map(toMinutes);
  if ([s, e, rs, re].some(Number.isNaN)) return false;
  return s >= rs && e <= re;
};

export const groupHorarios = (rawHorarios, diasConHorarios) => {
  const groups = new Map();

  rawHorarios.forEach((ha) => {
    const key = `${ha.horaInicio}|${ha.horaFin}|${ha.duracion}`;
    if (!groups.has(key)) {
      groups.set(key, {
        id: String(groups.size + 1),
        dias: [],
        horaInicio: ha.horaInicio,
        horaFin: ha.horaFin,
        duracion: Number(ha.duracion),
      });
    }

    const group = groups.get(key);

    diasConHorarios
      .filter((d) => Number(d.diaId) === Number(ha.dia?.id))
      .filter((d) => isWithin(ha.horaInicio, ha.horaFin, d._inicio, d._fin))
      .forEach((opt) => {
        if (!group.dias.some((o) => o.id === opt.id)) {
          group.dias.push(opt);
        }
      });
  });

  return Array.from(groups.values());
};

export const groupHorariosSimple = (horarios = []) => {
  const groups = new Map();

  horarios.forEach((h) => {
    const key = `${h.horaInicio}|${h.horaFin}|${h.duracionTurno}`;
    if (!groups.has(key)) {
      groups.set(key, {
        dias: [],
        horaInicio: h.horaInicio,
        horaFin: h.horaFin,
        duracion: Number(h.duracionTurno),
      });
    }

    const group = groups.get(key);
    const dia = h.dia || h.dia?.nombre;

    if (dia && !group.dias.includes(dia)) {
      group.dias.push(dia);
    }
  });

  return Array.from(groups.values());
};
