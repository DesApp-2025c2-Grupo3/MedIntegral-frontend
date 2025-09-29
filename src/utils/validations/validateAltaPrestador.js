export const validateAltaPrestador = (data) => {
  if (!data.cuilCuit) {
    return {
      field: 'cuilCuit',
      message: 'El CUIL o CUIT es obligatorio.',
    };
  }

  // Verifica si el CUIL/CUIT contiene alguna letra
  const tieneLetras = isNaN(data.cuilCuit);
  if (tieneLetras) {
    return {
      field: 'cuilCuit',
      message: 'El CUIL o CUIT no puede contener letras.',
    };
  }

  if (!data.nombre) {
    return {
      field: 'nombre',
      message: 'El nombre es obligatorio.',
    };
  }

  // Verifica si el nombre contiene algún número
  const tieneNumeros = data.nombre
    .split('')
    .some((char) => !isNaN(char) && char !== ' ');
  if (tieneNumeros) {
    return {
      field: 'nombre',
      message: 'El nombre no puede contener números.',
    };
  }

  // Verificación de teléfonos
  if (!data.telefonos || data.telefonos.length === 0) {
    return {
      field: 'telefonos',
      message: 'El teléfono es obligatorio.',
    };
  }

  for (const telefono of data.telefonos) {
    const tieneLetras = isNaN(telefono);
    if (tieneLetras) {
      return {
        field: 'telefonos',
        message: 'El teléfono no debe contener letras.',
      };
    }
  }

  // Verificación de emails
  if (!data.emails || data.emails.length === 0) {
    return {
      field: 'emails',
      message: 'El email es obligatorio.',
    };
  }

  for (const email of data.emails) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const tieneFormatoEmail = regexEmail.test(email);
    if (!tieneFormatoEmail) {
      return {
        field: 'emails',
        message: 'El email debe tener el formato correspondiente.',
      };
    }
  }

  if (data.especialidades.length === 0) {
    return {
      field: 'especialidades',
      message: 'Se debe seleccionar al menos una especialidad.',
    };
  }

  //Verificación de centros de atencion (dirección y horarios)
  for (const centro of data.centrosDeAtencion) {
    if (!centro.calle) {
      return {
        field: `centro-${centro.id}-calle`,
        message: 'La calle es obligatoria.',
      };
    }

    if (!centro.altura) {
      return {
        field: `centro-${centro.id}-altura`,
        message: 'La altura es obligatoria.',
      };
    }

    if (isNaN(centro.altura)) {
      return {
        field: `centro-${centro.id}-altura`,
        message: 'La altura no debe contener letras.',
      };
    }

    if (!centro.codigoPostal) {
      return {
        field: `centro-${centro.id}-codigoPostal`,
        message: 'El código postal es obligatorio.',
      };
    }

    if (isNaN(centro.codigoPostal)) {
      return {
        field: `centro-${centro.id}-codigoPostal`,
        message: 'El código postal no debe contener letras.',
      };
    }

    if (!centro.localidad) {
      return {
        field: `centro-${centro.id}-localidad`,
        message: 'La localidad es obligatoria.',
      };
    }

    if (!centro.provincia) {
      return {
        field: 'provincia',
        message: 'La provincia es obligatoria.',
      };
    }

    for (const horario of centro.horarios) {
      if (!horario.dias || horario.dias.length === 0) {
        return {
          field: `horario-${horario.id}-dias`,
          message: 'Debe seleccionar un día.',
        };
      }

      if (!horario.inicio) {
        return {
          field: `horario-${horario.id}-inicio`,
          message: 'Debe indicar un horario de inicio.',
        };
      }

      if (!horario.fin) {
        return {
          field: `horario-${horario.id}-fin`,
          message: 'Debe indicar un horario de fin.',
        };
      }

      if (horario.inicio.isSame(horario.fin)) {
        return {
          field: `horario-${horario.id}-horario`,
          message: 'El inicio y el fin no pueden ser iguales',
        };
      }

      if (horario.inicio > horario.fin) {
        return {
          field: `horario-${horario.id}-horario`,
          message: 'El horario de inicio debe ser anterior al de fin.',
        };
      }
    }
  }

  return null;
};
