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
import {Provider} from 'react-redux';
import store from './store/store';

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
            <Route path="/search" element={<Search />} />
            <Route path="/choice" element={<Choice />} />

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