import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
{
  /*DESCOMENTAR: import Sidebar from '../components/Sidebar';*/
}
import BreadcrumbsNav from '../components/common/BreadcrumbsNav';

export default function LayoutBase() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <BreadcrumbsNav />
      {/*DESCOMENTAR: <Sidebar />*/}
      <Box component="main" sx={{ flexGrow: 1, mt: 3 }}>
        <Outlet />
      </Box>
    </Container>
  );
}
