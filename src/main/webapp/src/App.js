import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import FooterMenu from './components/FooterMenu';
import Home from './components/Home';
import WishList from './components/WishList';
import Login_main from './components/login/Login_main';
import GoogleLogin from './components/login/GoogleLogin';
import ProfileMain from './components/profile/ProfileMain';
import ReservedCars from './components/profile/ReservedCars';
import UsedCarReviews from './components/profile/UsedCarReviews';
import CheckMyCar from './components/profile/checkCar/CheckMyCar';
import RegisterMain from './components/register/RegisterMain';
import {Provider} from 'react-redux';
import {store,persistor} from './store/store';
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
import UseAfter from "./components/profile/UseAfter";
import UseBefore from "./components/profile/UseBefore";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Searching from "./components/search/Searching";
import ChattingRoom from './components/chat/ChattingRoom';
import Choice from "./components/choice/Choice";
import KaKaoPay from './components/payment/KaKaoPay';
import KaKaoPaySuccess from './components/payment/KaKaoPaySuccess';
import NaverPay from './components/payment/NaverPay';
import NaverPayCompletion from './components/payment/NaverPayCompletion';
import Bookingbefore from "./components/profile/CSS/bookingbefore";
import CheckUseBeforeCard from "./components/profile/checkUseBefore/CheckUseBeforeCard";
import CheckUseBefore from "./components/profile/checkUseBefore/CheckUseBefore";
import UseNow from "./components/profile/UseNow";
import NaverLogin from "./components/login/NaverLogin";
import ChattingList from './components/chat/ChattingList';
import UseReview from "./components/profile/UseReview";
import UserReview from "./components/review/UserReview";
import { PersistGate } from 'redux-persist/integration/react';
import UserReviewItem from "./components/review/UserReviewItem";
import UserReviewInput from "./components/review/UserReviewInput";

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
          <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searching" element={<Searching />} />

            <Route path="/choice" element={<Choice />} />
            <Route path='payment'>
              <Route index element={<Payment_main />}/>
              <Route path='naverpay' element={NaverPay}/>
              <Route path='naverpaycompletion' element={NaverPayCompletion}></Route>
            </Route>

            <Route path="/wishList" element={<WishList />} />
            <Route path="/myWishList" element={<MyWishList />} />
            <Route path="login"  >
              <Route index element={<Login_main />}/>
              <Route path="kakao" element={<KakaoLogin/>}/>
              <Route path="/login/Google" element={<GoogleLogin/>}/>
              <Route path="naverLogin" element={<NaverLogin/>}/>
            </Route>
            <Route path="/profile">
              <Route index element={<ProfileMain />} />
              <Route path="checkusebefore/:user_id" element={<CheckUseBefore/>}/>
              <Route path="reservedCars" element={<ReservedCars />} />
              <Route path="usedCarReviews" element={<UsedCarReviews />} />
              <Route path="checkMyCar" element={<CheckMyCar/>} />
              <Route path="myProfile/:user_id" element={<MyProfile/>} />
              <Route path="myProfileUpdate/:user_id" element={<MyProfileUpdate/>} />
              <Route path="useAfter/:user_id" element={<UseAfter/>} />
              <Route path="useBefore/:user_id" element={<UseBefore/>} />
              <Route path="myRating" element={<MyRating/>}/>
              <Route path="bookingDetails" element={<BookingDetails/>} />
              <Route path="Details" element={<Details/>} />
              <Route path="useNow" element={<UseNow/>}/>
              <Route path="useReview/:user_id/:car_id/:booking_id" element={<UseReview/>}/>
              <Route path="userReviewItem" element={<UserReviewItem/>}/>
            </Route>
            <Route path='/car/new' element={<RegisterMain />} />
            <Route path='/car/driver' element={<DriverLicense />} />
            <Route path='/car/driverCheck' element={<DriverCheck />} />


            <Route path='/kakaopay' element={<KaKaoPay />} />
            <Route path='/success' element={<KaKaoPaySuccess />} />



            <Route path='/choice/:carid&:startdate&:enddate&:price' element={<Choice />} />

            <Route path='/ChattingRoom/:roomSeq' element={<ChattingRoom />} />
            <Route path='/ChattingList' element={<ChattingList />} />

          </Routes>
          </PersistGate>
          </Provider>
        </Box>
      </BrowserRouter>
      </QueryClientProvider>
    </React.Fragment>

  );
}

export default App;