import { Grid, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import PropTypes from 'prop-types';

export default function DiasSemanaSelector({ dias }) {
  return (
    <FormGroup sx={{ mb: 3, width: '100%', mt: 1 }}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {dias.map((dia) => (
          <Grid sx={{ xs: 6, sm: 3, md: 2 }} key={dia}>
            <FormControlLabel control={<Checkbox />} label={dia} />
          </Grid>
        ))}
      </Grid>
    </FormGroup>
  );
}

DiasSemanaSelector.propTypes = {
  dias: PropTypes.array.isRequired,
};
