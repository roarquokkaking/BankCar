import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setDriver, setEmail, setId, setName, setProfile_image} from "../../store/loginSlice";


const NaverLogin = () => {
    console.log("naver login")

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        const userStr = params.get("user");
        const state = params.get('naverState');
        const savedState = localStorage.getItem('naverState'); // 저장된 `state` 값 불러오기
        if (userStr && (savedState === state)) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                console.log(user);

                const id = user.id;
                const email = user.email;
                const name = user.name;
                const profileImage = user.profile_image;
                const driver = user.driver;

                if (id && email && name) {
                    dispatch(setId(id));
                    dispatch(setEmail(email));
                    dispatch(setName(name));
                    dispatch(setProfile_image(profileImage))
                    dispatch(setDriver(driver))
                }
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }else {
            console.log("회원 정보가 없거나 확인 코드가 다릅니다.")
        }

        localStorage.removeItem('naverState'); // `state` 값 삭제
        navigate('/');
    }, [params, location, dispatch, navigate]);


    return (
        <div>
            네이버 로그인
        </div>
    );
};

export default NaverLogin;
