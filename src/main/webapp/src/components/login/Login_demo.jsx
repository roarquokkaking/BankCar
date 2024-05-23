import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import './LoginBtn.css'

const Login_demo = () => {

    const navigate = useNavigate();
    
    const cliend_id="601610993000-u4u34s3r1op37juvet6fmr0hee3e3u1d.apps.googleusercontent.com";
    const redirect_uri="http://localhost:8080/login/google";
    

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      });
      const isBigScreen = useMediaQuery({
        query: '(min-width: 1824px)'
      });
      const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1224px)'
      });
      
    
    return (
        <div>
            {isDesktopOrLaptop && <p>모바일 환경으로 접속 바랍니당 ~~__~~ ^^!!</p>}
            {isBigScreen && <p>You have a huge screen</p>}
            {isTabletOrMobile && 
            <div>
                <button 
                    className="kakao-login-button"
                    type="button"> 
                    <img src="./kakao.png" alt="카카오 아이콘" />
                        카카오로 로그인하기
                </button>
               
                <button 
                    className="naver-login-button"
                    type="button">
                        <img src="./naverBtn.png" alt="네이버 아이콘" />
                        네이버로 로그인하기 
                </button>

                <button 
                    className="google-login-button"
                    type="button">
                    <img src="./google01.png" alt="구글 아이콘" />
                        구글로 로그인하기        
                </button>

                <button 
                    className="github-login-button"
                    type="button" 
                    value="깃허브로 로그인하기">  
                    <img src="./gitBtn.png" alt="깃허브 아이콘" />
                        깃허브로 로그인하기
                </button>
                
            </div>
            
            }

        </div>
    );
};

export default Login_demo;