import React from 'react';
import "./ButtonWithIcon.css";

const ButtonWithIcon = ({ iconSrc, text, onClick }) => {
  return (
    <button className="button-with-icon" onClick={onClick}>
      <img src={iconSrc} alt="icon" className="button-icon" />
      <span className="button-text">{text}</span>
    </button>
  );
};
const Login = () => {
    return (
      <div>
        <h1>로그인 페이지</h1>
        <ButtonWithIcon
          iconSrc={'./logo192.png'}
          text="네이버 로그인"
        />
      </div>
    );
};

export default Login;