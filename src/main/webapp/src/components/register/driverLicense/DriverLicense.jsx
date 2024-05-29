import React from 'react';
import DriverHeader from './DriverHeader';
import DriverContent from './DriverContent';
import DriverFooter from './DriverFooter';
import './css/Main.css';
import { Box } from '@mui/material';
import FooterMenu from '../../FooterMenu';

const DriverLicense = () => {
    return (
        <div className="App">
      <DriverHeader />
      <DriverContent />
      <DriverFooter />
      <Box sx={{ display: { xs: "flex", md: "none" }, marginTop: "auto" }}>
            <FooterMenu />
          </Box>
    </div>
    );
};

export default DriverLicense;