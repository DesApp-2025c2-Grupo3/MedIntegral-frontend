import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function Footer() {
  return (
    <Box
      sx={{ flexGrow: 1 }}
      style={{ backgroundColor: '#0b111e', padding: '1em' }}
    >
      <Grid container spacing={3}>
        <Grid size="grow">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img></img>
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
          </Box>
        </Grid>
        <Grid size={6}></Grid>
        <Grid size="grow">
          <p style={{ color: 'white', fontWeight: '500' }}>
            © 2025 - Medicina Integral Group
          </p>
        </Grid>
      </Grid>
    </Box>
  );
}
