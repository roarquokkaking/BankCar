import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import OptionsTab from './components/OptionsTab';
import Container from '@mui/material/Container';
import LocationCards from './components/LocationCards';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Footer from './components/Footer';
import FooterMenu from './components/FooterMenu';
import { displayOnDesktop } from './themes/commonStyles';
import MobileFooter from './components/MobileFooter';
import Home from './components/Home';
import Login from './components/Login';
import WishList from './components/WishList';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishList" element={<WishList />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Box sx={{ display: { xs: "flex", md: "none" }, marginTop: "auto" }}>
            <FooterMenu />
          </Box>
          {/* <Box sx={displayOnDesktop}>
            <Footer />
          </Box> */}
        </Box>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;