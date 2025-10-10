import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import BrandLogo from './common/BrandLogo';
import './Footer.css';

export default function Footer({ sx }) {
  return (
    <Box className="footer-container" sx={sx}>
      <Grid container className="footer-grid">
        <Grid className="footer-logo">
          <BrandLogo clickable size="medium" />
        </Grid>

        <Grid className="footer-text">
          <Typography variant="body2" className="footer-rights">
            © 2025 - Medicina Integral Group
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

Footer.propTypes = {
  sx: PropTypes.object,
};
