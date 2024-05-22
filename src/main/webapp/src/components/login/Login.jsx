import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { IoHomeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {

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
                <div style={{backgroundImage:'url(./file3.jpg)',width:'100%',height:'100vh',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2)',borderRadius:'10px',backgroundSize:'cover'}}>
                    <h1 style={{color:'white',textAlign:'center',paddingTop:'30%',marginTop:0}}>Let's share</h1>
                    <h3 style={{color:'white',textAlign:'center'}}>Safety first</h3>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'100px',opacity:0.8}}>
                        {/* <input type='button' style={{backgroundImage:'url(./btnG_official.png)',width:'80%',height:'50px',backgroundSize:'cover',backgroundPosition:'center',border:0,borderRadius:'10px',cursor:'pointer'}}/> */}
                        <button type='button' style={{display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                border: 0, 
                borderRadius: '10px', 
                cursor: 'pointer', 
                width: '299px', 
                height: '50px', 
                padding: 0, 
                background: 'white'}}>
                            <img src='./btnW_아이콘사각.png' alt='naver_logo' style={{width:'50px',height:'50px'}}/><span style={{textAlign:'center',flexGrow:1}}>네이버 로그인</span>  
                        </button>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px',opacity:0.8}}>
                        <input type='button' style={{backgroundImage:'url(./google.png)',width:'80%',height:'50px',backgroundSize:'cover',backgroundPosition:'center',border:0,borderRadius:'10px',cursor:'pointer'}} onClick={()=>window.location.href=`https://accounts.google.com/o/oauth2/auth?client_id=${cliend_id}&redirect_uri=${redirect_uri}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`}/>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px',opacity:0.8}}>
                        <input type='button' style={{backgroundImage:'url(./kakao.png)',width:'80%',height:'50px',backgroundSize:'cover',backgroundPosition:'center',border:0,borderRadius:'10px',cursor:'pointer'}}/>
                    </div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'10px',opacity:0.8}}>
                        <input type='button' style={{backgroundImage:'url(./git.png)',width:'80%',height:'50px',backgroundSize:'cover',backgroundPosition:'center',border:0,borderRadius:'10px',cursor:'pointer'}}/>
                    </div>
                    
                    <div style={{ position: 'fixed', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}>

                    <IoHomeOutline size='50'/>
                    </div>
                    
                </div>
            </div>
            
            }

        </div>
    );
};

export default Login;