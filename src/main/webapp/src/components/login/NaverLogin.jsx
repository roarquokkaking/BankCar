import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setEmail, setId, setName} from "../../store/loginSlice";


const NaverLogin = () => {
    console.log("naver login")

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const userStr = params.get("user");
        const savedState = localStorage.getItem("naverState");
        const responseState = params.get("naverState");

        if (userStr && (savedState === responseState)) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                console.log(user);

                const id = user.id;
                const email = user.email;
                const name = user.name;

                if (id && email && name) {
                    dispatch(setId(id));
                    dispatch(setEmail(email));
                    dispatch(setName(name));
                }
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }else {
            console.log("서버에서 값을 받지 못했거나 응답 코드가 맞지 않습니다.")
        }

        navigate('/');
    }, [params, location, dispatch, navigate]);


    return (
        <div>
            네이버 로그인
        </div>
    );
};

export default NaverLogin;