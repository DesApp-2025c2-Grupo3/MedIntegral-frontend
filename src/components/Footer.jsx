import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import logo from '../../public/medIntegralLogo.png';

export default function Footer() {
  return (
    <Box style={{ backgroundColor: '#0b111e', padding: '1em' }}>
      <Grid container spacing={3}>
        <Grid
          flexGrow={1}
          sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img
            src={logo}
            alt='"Logo MedIntegral"'
            style={{ height: '60px' }}
          ></img>
          <p
            style={{
              color: '#00B1EA',
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '500',
            }}
          >
            Med
            <span style={{ color: '#FFFFFF' }}>Integral</span>
          </p>
        </Grid>
        <Grid>
          <p style={{ color: 'white', fontWeight: '500' }}>
            © 2025 - Medicina Integral Group
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}
