import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
{
  /*DESCOMENTAR: import Sidebar from '../components/Sidebar';*/
}
import Footer from '../components/Footer';
import BreadcrumbsNav from '../components/common/BreadcrumbsNav';

export default function LayoutBase() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1 }}>
        <BreadcrumbsNav />
        {/*DESCOMENTAR: <Sidebar />*/}
        <Box component="main" sx={{ flexGrow: 1, mt: 3 }}>
          <Outlet />
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
