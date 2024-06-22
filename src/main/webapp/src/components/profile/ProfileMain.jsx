import React, {useEffect, useState} from 'react';
import "./ProfilePage.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setId, setEmail, setName} from '../../store/loginSlice';
import { Box} from "@mui/material";
import FooterMenu from "../FooterMenu";
import axios from "axios";

// 구분선 컴포넌트
const Divider = () => {
    return (
        <hr
            style={{
                borderColor: "#fff", // 구분선 색상 설정
                borderWidth: 1, // 구분선 두께 설정
                margin: "0 20px", // 상하로 10px, 좌우로 0px 마진 설정
            }}
        />
    );
};

const ProfileMain = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const driverYN = useSelector((state)=>state.Login.driver);
    const user_id = useSelector(state => state.Login.id)
    const userName = useSelector(state => state.Login.name)
    const profileImage = useSelector(state => state.Login.profile_image);
    const userEmail  = useSelector(state => state.Login.email);
    const newDriverYN = driverYN==="true";
    const onToCarNew = () => {
        navigate('/car/new');
    }

    const onNotiTest = () => {
        axios.get("http://localhost:8080/test")
            .then(res => console.log(res.data))
            .catch(error => console.log(error))
    }

    return (
        <>
            <Box sx={{ pb: 7 }}>
            <div className="profile-container">
                <header>
                    <h1>프로필</h1>
                </header>
                <Link  to={`/profile/myprofile/${user_id}`} className="user-profile">
                    <section className="user-info">
                        <div className="user-img-name">
                            {
                                profileImage ?
                                    <img
                                        src={profileImage}
                                        alt="유저 이미지"
                                        className="user-image"
                                    /> :
                                    <img
                                        src={`${process.env.PUBLIC_URL}/image/nullImage2.png`}
                                        alt="유저 이미지"
                                        className="user-image"
                                    />
                            }


                            <div className="text-info">
                                <h4>{userName}</h4>
                                <p>{userEmail}</p>
                            </div>
                        </div>
                        <div style={{marginRight: "10px"}}>
                        <ArrowForwardIosIcon/>
                    </div>
                </section>
                </Link>
                <Divider/>
                <button
                    className="register-button"
                    margin={20}
                    onClick={onToCarNew}
                >
                    <span>
                    BankCar에 <br/>
                        &emsp;당신의 자동차를 등록해 보세요.
                    <small style={{color: "gray"}}>
                      <br/>
                      <br/> 지금 바로 등록하러가기
                    </small>
                    </span>
                    <img src="./image/car.png" alt="귀여운 자동차"/>
                </button>

                <button
                    className="register-button"
                    margin={20}
                    onClick={()=>navigate("/car/driver")}
                    disabled={newDriverYN}
                >
          <span>
            {
                newDriverYN?<>이미 면허증 등록이 완료되었습니다.</>:<>BankCar에 <br/>
                &emsp; 당신의 면허증을 등록해 주세요.</>
            }

            <small style={{color: "gray"}}>
              <br/>
              <br/> 지금 바로 등록하러가기
            </small>
          </span>
                    <img src="./image/ID_certi.png" alt="면허 인증"/>
                </button>
                <ul className="profile-actions">
                    <li>
                        <Link to={`/profile/checkUseBefore/${user_id}`}>
                            예약한 자동차 보기
                            <div style={{marginRight: "10px"}}>
                                <ArrowForwardIosIcon/>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to={`/profile/useafter/${user_id}`}>
                            사용한 자동차 후기 남기기
                            <div style={{marginRight: "10px"}}>
                                <ArrowForwardIosIcon/>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link to="checkMyCar">
                            나의 자동차 확인하기
                            <div style={{marginRight: "10px"}}>
                                <ArrowForwardIosIcon/>
                            </div>
                        </Link>
                    </li>
                    <div style={{marginLeft: '80%', cursor: 'pointer', color: 'blue'}} onClick={() => {
                        dispatch(setId(''));
                        dispatch(setEmail(''));
                        dispatch(setName(''));

                        navigate('/');

                    }}> 로그아웃
                    </div>
                </ul>
            </div>
                <button onClick={onNotiTest}>알림 테스트</button>

            </Box>
            <Box sx={{display: {xs: "flex", md: "none"}, marginTop: "auto"}}>
                <FooterMenu/>
            </Box>
        </>
    );
};

export default ProfileMain;
