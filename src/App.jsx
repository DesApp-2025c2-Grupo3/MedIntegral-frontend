import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import AltaTurnos from './pages/AltaTurnos';

function App() {
  return (
    <Container maxWidth="md">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alta-turnos" element={<AltaTurnos />} />
        <Route path="*" element={<h1>404 - No encontrado</h1>} />
      </Routes>
    </Container>
  );
}

export default App;
