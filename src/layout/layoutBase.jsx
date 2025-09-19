import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Sidebar from '../components/Sidebar';
import BreadcrumbsNav from '../components/BreadcrumbsNav';

export default function LayoutBase() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <BreadcrumbsNav />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, mt: 3 }}>
        <Outlet />
      </Box>
    </Container>
  );
}
