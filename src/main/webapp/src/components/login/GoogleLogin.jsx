import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { setId,setEmail,setName, setDriver } from '../../store/loginSlice';
import { useDispatch } from 'react-redux';

const GoogleLogin = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(()=>{
        const id = params.get('id');
        const email = params.get('email');
        const name = params.get('name');
        const driver = params.get('driver');
    
        if(id&&email&&name){
            dispatch(setId(id));
            dispatch(setEmail(email));
            dispatch(setName(name));
            dispatch(setDriver(driver));
        }
        
        navigate('/')
    },[params])
    
    return (
        <div>
            구글 로그인 화면
            
            
        </div>
    );
};

export default GoogleLogin;