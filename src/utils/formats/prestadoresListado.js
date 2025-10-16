export const formatPrestadoresListado = (data) => {
  try {
    if (!data || !Array.isArray(data)) {
      throw new Error('La respuesta no tiene el formato esperado');
    }

    const itemsFormateados = data.map((p) => {
      const direcciones =
        p.centrosDeAtencion?.map((d) =>
          [
            d.calle || '',
            d.altura || '',
            d.pisoDepto ? `, ${d.pisoDepto}` : '',
            d.localidad ? `, ${d.localidad}` : '',
            d.provincia ? `, ${d.provincia}` : '',
          ]
            .join(' ')
            .trim()
        ) || [];

      const telefonos = p.telefonos?.map((t) => t.numero || '') || [];
      const emails = p.emails?.map((e) => e.direccion || '') || [];

      return {
        id: p.id ?? null,
        nombre: p.nombre || '',
        cuilCuit: p.cuilCuit || '',
        esCentroMedico: p.esCentroMedico ?? false,
        especialidades:
          Array.isArray(p.especialidades) && p.especialidades.length
            ? p.especialidades.map((e) =>
                typeof e === 'object' ? (e.nombre ?? '') : e
              )
            : [],
        direcciones,
        telefonos,
        emails,
        createdAt: p.createdAt || null,
      };
    });

    return {
      ...data,
      items: itemsFormateados,
    };
  } catch (err) {
    console.error('Error al formatear prestadores:', err);
    return {
      ...data,
      items: data?.items || [],
      error: true,
      errorMessage: err.message,
    };
  }
};
