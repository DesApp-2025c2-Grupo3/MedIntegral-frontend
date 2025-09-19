//Solo es una base para tener algo, cambiar
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi App
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Inicio
        </Button>
        <Button color="inherit" component={RouterLink} to="/alta-turnos">
          Alta turnos
        </Button>
      </Toolbar>
    </AppBar>
  );
}
