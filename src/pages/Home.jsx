import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function Home() {
  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a la página de inicio
      </Typography>
      <Typography variant="body1">pruebita</Typography>
    </Paper>
  );
}
