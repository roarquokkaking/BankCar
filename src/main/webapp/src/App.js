import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation} from "react-router-dom";
import './App.css';
import FooterMenu from './components/FooterMenu';
import Home from './components/Home';
import WishList from './components/WishList';
import Search from "./components/Search";
import Login_main from './components/login/Login_main';
import GoogleLogin from './components/login/GoogleLogin';
import Choice from './components/Choice';
import Payment_main from './components/payment/Payment_main';

function App() {
  return (
    <React.Fragment>
      <Router>
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
            <Route path="/login"  >
              <Route index element={<Login_main />}/>
              <Route path="/login/Google" element={<GoogleLogin/>}/>
            </Route>
            <Route path="/search" element={<Search />} />
            <Route path="/choice" element={<Choice />} />
            <Route path="/payment" element={<Payment_main />} />
          </Routes>
          <Box sx={{ display: { xs: "flex", md: "none" }, marginTop: "auto" }}>
          <FooterMenu />
          </Box>
        </Box>
      </Router>
    </React.Fragment>
    
  );
}

export default App;