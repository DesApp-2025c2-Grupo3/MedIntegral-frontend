import {
  Grid,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@mui/material';
import PropTypes from 'prop-types';

export default function DiasSemanaSelector({
  dias,
  error,
  helperText,
  ...props
}) {
  return (
    <FormGroup sx={{ mb: 3, width: '100%', mt: 1 }} {...props}>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {dias.map((dia) => (
          <Grid sx={{ xs: 6, sm: 3, md: 2 }} key={dia}>
            <FormControlLabel control={<Checkbox />} label={dia} />
          </Grid>
        ))}
      </Grid>

      {error && (
        <FormHelperText error sx={{ ml: 2 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormGroup>
  );
}

DiasSemanaSelector.propTypes = {
  dias: PropTypes.array.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

DiasSemanaSelector.defaultProps = {
  error: false,
  helperText: '',
};
