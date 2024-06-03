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
import MyWishList from "./components/MyWishList";
import MyProfile from "./components/profile/MyProfile";
import BookingDetails from "./components/profile/BookingDetails";
import MyRating from "./components/profile/MyRating";
import {Details} from "@mui/icons-material";
import MyProfileUpdate from "./components/profile/MyProfileUpdate";
import KakaoLogin from './components/login/KakaoLogin';
import ChatRoom from './components/chat/ChatRoom';
import UseAfter from "./components/profile/UseAfter";
import UseBefore from "./components/profile/UseBefore";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



function Detail() {
  return null;
}
const queryClient = new QueryClient();
function App() {
  return (

    <React.Fragment>
      <QueryClientProvider client={queryClient}>
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
            <Route path="/myWishList" element={<MyWishList />} />
            <Route path="login"  >
              <Route index element={<Login_main />}/>
              <Route path="kakao" element={<KakaoLogin/>}/>
              <Route path="/login/Google" element={<GoogleLogin/>}/>
            </Route>
            <Route path="/profile">
              <Route index element={<ProfileMain />} />
              <Route path="reservedCars" element={<ReservedCars />} />
              <Route path="usedCarReviews" element={<UsedCarReviews />} />
              <Route path="checkMyCar" element={<CheckMyCar/>} />
              <Route path="myProfile/:user_id" element={<MyProfile/>} />
              <Route path="myProfileUpdate/:user_id" element={<MyProfileUpdate/>} />
              <Route path="useAfter" element={<UseAfter/>} />
              <Route path="useBefore" element={<UseBefore/>} />
              <Route path="myRating" element={<MyRating/>}/>
              <Route path="bookingDetails" element={<BookingDetails/>} />
              <Route path="Details" element={<Details/>} />
            </Route>
            <Route path='/car/new' element={<RegisterMain />} />
            <Route path='/car/driver' element={<DriverLicense />} />
            <Route path='/car/driverCheck' element={<DriverCheck />} />
            <Route path="/search" element={<Search />} />
            <Route path="/choice" element={<Choice />} />

            <Route path='/payment' element={<Payment_main />} />

            <Route path='/chatroom' element={<ChatRoom />} />

          </Routes>
          </Provider>
        </Box>
      </BrowserRouter>
      </QueryClientProvider>
    </React.Fragment>

  );
}

export default App;