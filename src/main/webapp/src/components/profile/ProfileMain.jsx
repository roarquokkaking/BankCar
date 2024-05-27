import React from 'react';
import "./ProfilePage.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setId,setEmail,setName } from '../../store/loginSlice';

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
    return (
      <div className="profile-container">
        <header>
          <h1>프로필</h1>
        </header>
        <section className="user-info">
          <div className="user-img-name">
            <img
              src="https://wrtn-image-user-output.s3.ap-northeast-2.amazonaws.com/6631b6db962f730c6207b3c2/fd53f817-13a7-482c-9492-26a270549528.png"
              alt="유저 이미지"
              className="user-image"
            />
            <div className="text-info">
              <h4>사용자 이름</h4>
              <p>user@example.com</p>
            </div>
          </div>
          <div style={{ marginRight: "10px" }}>
            <ArrowForwardIosIcon />
          </div>
        </section>
        <Divider />
        <Button
          className="register-button"
          margin={20}
          component={Link}
          to={"/car/new"}
        >
          <span>
            BankCar에 <br />
            &emsp;당신의 자동차를 등록해 보세요.
            <small style={{ color: "gray" }}>
              <br />
              <br /> 지금 바로 등록하러가기
            </small>
          </span>
          <img src="./image/car.png" alt="귀여운 자동차" />
        </Button>
        <Button
          className="register-button"
          margin={20}
          component={Link}
          to={"/car/driver"}
        >
          <span>
            BankCar에 <br />
            &emsp;당신의 면허증을 등록해 주세요.
            <small style={{ color: "gray" }}>
              <br />
              <br /> 지금 바로 등록하러가기
            </small>
          </span>
          <img src="./image/ID_certi.png" alt="면허 인증" />
        </Button>
        <ul className="profile-actions">
          <li>
            <Link to="reservedCars">
              예약한 자동차 보기
              <div style={{ marginRight: "10px" }}>
                <ArrowForwardIosIcon />
              </div>
            </Link>
          </li>
          <li>
            <Link to="usedCarReviews">
              사용한 자동차 후기 남기기
              <div style={{ marginRight: "10px" }}>
                <ArrowForwardIosIcon />
              </div>
            </Link>
          </li>
          <li>
            <Link to="checkMyCar">
              나의 자동차 확인하기
              <div style={{ marginRight: "10px" }}>
                <ArrowForwardIosIcon />
              </div>
            </Link>
          </li>
          <div style={{marginLeft:'80%',cursor:'pointer',color:'blue'}} onClick={()=>{
              dispatch(setId(''));
              dispatch(setEmail(''));
              dispatch(setName(''));

              navigate('/');

          }} > 로그아웃 </div>

        </ul>
      </div>
    );
};

export default ProfileMain;
