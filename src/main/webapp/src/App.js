import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import FooterMenu from './components/FooterMenu';
import Home from './components/Home';
import WishList from './components/WishList';
import Search from "./components/Search";
import Login_main from './components/login/Login_main';
import GoogleLogin from './components/login/GoogleLogin';
import Choice from './components/Choice';
import ProfileMain from './components/profile/ProfileMain';
import ReservedCars from './components/profile/ReservedCars';
import UsedCarReviews from './components/profile/UsedCarReviews';
import CheckMyCar from './components/profile/CheckMyCar';
import RegisterMain from './components/register/RegisterMain';
import {Provider} from 'react-redux';
import store from './store/store';
import Payment_main from './components/payment/Payment_main';
import DriverLicense from './components/register/driverLicense/DriverLicense';
import DriverCheck from './components/register/driverLicense/DriverCheck';

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
          <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishList" element={<WishList />} />
            <Route path="login"  >
              <Route index element={<Login_main />}/>
              <Route path="/login/Google" element={<GoogleLogin/>}/>
            </Route>
            <Route path="/profile">
              <Route index element={<ProfileMain />} />
              <Route path="reservedCars" element={<ReservedCars />} />
              <Route path="usedCarReviews" element={<UsedCarReviews />} />
              <Route path="checkMyCar" element={<CheckMyCar />} />
            </Route>
            <Route path='/car/new' element={<RegisterMain />} />
            <Route path='/car/driver' element={<DriverLicense />} />
            <Route path='/car/driverCheck/:imageName' element={<DriverCheck />} />
            <Route path="/search" element={<Search />} />
            <Route path="/choice" element={<Choice />} />
            <Route path='/payment' element={<Payment_main />} />
          </Routes>
          <Box sx={{ display: { xs: "flex", md: "none" }, marginTop: "auto" }}>
            <FooterMenu />
          </Box>
          </Provider>
          {/* <Box sx={displayOnDesktop}>
            <Footer />
          </Box> */}
        </Box>

      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;