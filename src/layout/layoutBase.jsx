import { Outlet } from 'react-router-dom';
import { Box, Container, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';

import AppBarCustom from '../components/common/navigation/AppBarCustom';
import Sidebar from '../components/common/navigation/Sidebar';
import SidebarModal from '../components/common/navigation/SidebarModal';
import Footer from '../components/Footer';
import BreadcrumbsNav from '../components/common/BreadcrumbsNav';

export default function LayoutBase() {
  const theme = useTheme();
  const esMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleModal = () => setModalOpen((prev) => !prev);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBarCustom onMenuClick={esMobile ? toggleModal : toggleSidebar} />

      {!esMobile && <Sidebar open={sidebarOpen} toggleOpen={toggleSidebar} />}

      {esMobile && <SidebarModal open={modalOpen} onClose={toggleModal} />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: 8,
          transition: 'margin 0.3s ease',
          ml: !esMobile ? (sidebarOpen ? '350px' : '90px') : 0,
        }}
      >
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          <BreadcrumbsNav />
          <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Outlet />
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
