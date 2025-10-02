import { Box, Grid, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#0b111e',
        padding: '1em',
        marginLeft: { md: '5.5rem' },
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Grid sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="/medIntegralLogo.png"
            alt='"Logo MedIntegral"'
            style={{ height: '50px' }}
          ></img>
          <Typography
            sx={{
              color: '#00B1EA',
              margin: 0,
              fontSize: '1rem',
              fontWeight: '500',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Med
            <span style={{ color: '#FFFFFF' }}>Integral</span>
          </Typography>
        </Grid>
        <Grid>
          <Typography
            sx={{
              color: 'white',
              fontSize: { xs: '0.75rem', sm: '1rem' },
              fontWeight: '500',
            }}
          >
            © 2025 - Medicina Integral Group
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
