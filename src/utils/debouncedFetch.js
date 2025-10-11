const debounceTimers = new Map();

export const debouncedFetch = (
  baseUrl,
  query,
  setOptions,
  delay = 400,
  formatter,
  extraParams = {}
) => {
  if (debounceTimers.has(baseUrl)) clearTimeout(debounceTimers.get(baseUrl));

  const timer = setTimeout(async () => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setOptions([]);
      return;
    }

    try {
      const params = new URLSearchParams({
        textInputSearch: trimmed,
        ...extraParams,
      });
      const res = await fetch(`${baseUrl}?${params.toString()}`);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      const formatted =
        formatter?.(data) ||
        data.map((item) => ({
          label:
            item.nombreCompleto ||
            item.nombre ||
            item.descripcion ||
            item.label ||
            'Sin nombre',
          value: item.id || item.value,
        }));

      setOptions(formatted);
    } catch (err) {
      console.error(`Error al buscar en ${baseUrl}:`, err);
      setOptions([]);
    }
  }, delay);

  debounceTimers.set(baseUrl, timer);
};
