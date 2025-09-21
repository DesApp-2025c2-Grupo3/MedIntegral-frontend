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
  selected = [],
  onChange,
  error,
  helperText,
  dataField,
}) {
  const handleToggle = (dia) => {
    const newValue = selected.includes(dia)
      ? selected.filter((d) => d !== dia)
      : [...selected, dia];
    onChange(newValue);
  };

  const hasError = Boolean(error);
  const helper = hasError ? (helperText ?? '') : '';

  return (
    <FormGroup sx={{ mb: 3, width: '100%', mt: 1 }}>
      <Grid container spacing={2} sx={{ mt: 1 }} data-field={dataField}>
        {dias.map((dia) => (
          <Grid sx={{ xs: 6, sm: 3, md: 2 }} key={dia}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selected.includes(dia)}
                  onChange={() => handleToggle(dia)}
                />
              }
              label={dia}
            />
          </Grid>
        ))}
      </Grid>
      {hasError && <FormHelperText error>{helper}</FormHelperText>}
    </FormGroup>
  );
}

DiasSemanaSelector.propTypes = {
  dias: PropTypes.array.isRequired,
  selected: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  dataField: PropTypes.string,
};
