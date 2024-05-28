import React, { useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { setId,setEmail,setName } from '../../store/loginSlice';
import { useDispatch } from 'react-redux';

// const REST_API_KEY = 'f71b69bb47cf0fff57324d35d3a3ae0f';
// const REDIRECT_URI = 'http://localhost:8080/login/kakao';
// const TOKEN_URI = 'https://kauth.kakao.com/oauth/token';
// const USER_INFO_URI = 'https://kapi.kakao.com/v2/user/me';
const LoginKakao = () => {

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const id = params.get('id');
        const email = params.get('email');
        const name = decodeURIComponent(params.get('name'));
    
        if(id&&email&&name){
            dispatch(setId(id));
            dispatch(setEmail(email));
            dispatch(setName(name));
        }
        
        navigate('/')
    },[params, location, dispatch])
    
    return (
        <div>
            카카오로 로그인 중입니다....
        </div>
    );
};

export default LoginKakao;