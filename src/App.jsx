import { Routes, Route } from 'react-router-dom';
import Layout from './layout/layoutBase';

import Home from './pages/Home';

import AgendaListado from './pages/agenda-turnos/Listado';
import AgendaAlta from './pages/agenda-turnos/Alta';
import AgendaEdicion from './pages/agenda-turnos/Edicion';

import PrestadoresListado from './pages/prestadores/Listado';
import PrestadoresAlta from './pages/prestadores/Alta';
import PrestadoresEdicion from './pages/prestadores/Edicion';

import AfiliadosListado from './pages/afiliados/Listado';
import AfiliadosAlta from './pages/afiliados/Alta';
import AfiliadosEdicion from './pages/afiliados/Edicion';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="agenda-turnos">
          <Route path="listado" element={<AgendaListado />} />
          <Route path="alta" element={<AgendaAlta />} />
          <Route path="edicion/:id" element={<AgendaEdicion />} />
        </Route>

        <Route path="prestadores">
          <Route path="listado" element={<PrestadoresListado />} />
          <Route path="alta" element={<PrestadoresAlta />} />
          <Route path="edicion/:id" element={<PrestadoresEdicion />} />
        </Route>

        <Route path="afiliados">
          <Route path="listado" element={<AfiliadosListado />} />
          <Route path="alta" element={<AfiliadosAlta />} />
          <Route path="edicion/:id" element={<AfiliadosEdicion />} />
        </Route>

        <Route path="*" element={<h1>404 - No encontrado</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
