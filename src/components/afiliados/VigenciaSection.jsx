// En src/components/afiliados/VigenciaAfiliadoSection.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Grid, FormControlLabel, Switch } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function VigenciaSection({
  afiliadoData,
  onDateChange,
  onSwitchChange,
}) {
  return (
    <Box>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Vigencia
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DatePicker
            label="Vigencia desde"
            value={afiliadoData.vigenciaInicio}
            onChange={(newValue) => onDateChange('vigenciaInicio', newValue)}
            slotProps={{
              textField: { fullWidth: true, required: true },
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControlLabel
            control={
              <Switch
                checked={afiliadoData.tieneFechaBaja}
                onChange={onSwitchChange}
                name="tieneFechaBaja"
              />
            }
            label="Registrar fecha baja"
          />
        </Grid>
        {afiliadoData.tieneFechaBaja && (
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <DatePicker
              label="Vigencia hasta"
              value={afiliadoData.vigenciaFin}
              onChange={(newValue) => onDateChange('vigenciaFin', newValue)}
              slotProps={{
                textField: { fullWidth: true },
              }}
            />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

VigenciaSection.propTypes = {
  afiliadoData: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSwitchChange: PropTypes.func.isRequired,
};
