import { Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import PropTypes from 'prop-types';

export default function DiasSemanaSelector({ dias }) {
  return (
    <FormGroup sx={{ mb: 3, width: '100%', mt: 1 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          '@media (min-width:600px) and (max-width:1200px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 2,
          },
          '@media (max-width:600px)': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
          },
        }}
      >
        {dias.map((dia) => (
          <FormControlLabel
            key={dia}
            control={<Checkbox />}
            label={dia}
            sx={{
              flex: '1 1 calc(10% - 16px)',
              minWidth: '120px',
            }}
          />
        ))}
      </Box>
    </FormGroup>
  );
}

DiasSemanaSelector.propTypes = {
  dias: PropTypes.array.isRequired,
};
