import React, {useEffect, useState} from 'react';
import axios from "axios";

const NaverLogin = () => {
    const [url, setUrl] = useState('');

    axios.get(`http://localhost:8080/user/naverLogin`)
        .then(res => setUrl(res.data))
        .catch(error=> console.log(error))

    useEffect(() => {
        window.location.href = url;
    }, [url])

    return (
        <div>
            네이버 로그인
        </div>
    );
};

export default NaverLogin;