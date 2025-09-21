export const makeHorario = () => ({
  id: crypto.randomUUID(),
  dias: [],
  duracion: null,
  inicio: null,
  fin: null,
});
