import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/payment.module.css';

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const [pg_token,setPg_token]=useState('');
    const [payDetail,setPayDetail]=useState({});


    useEffect(()=>{
        setPg_token(params.get('pg_token'));
        
    },[params])

    
    useEffect(()=>{
        
        if(pg_token){
            // alert(pg_token);
        axios.get("https://dongwoossltest.shop/api/payment/success",{
            params:{
                pgToken:pg_token
            }
        }).then(res=>
            {
                setPayDetail(res.data);
                console.log(res.data);
            }
        ).catch(err=>console.log(err))
    }
    },[pg_token])


    return (
        <div className="App">
              <div className="confirmation-container">
                <div className="icon">
                  <img src="https://via.placeholder.com/100" alt="Success Icon" />
                </div>
                <h1>결제가 완료되었습니다!</h1>
                <p>주문이 성공적으로 완료되었습니다. 주문 내역은 이메일로 발송되었습니다.</p>
                <button className="home-button" onClick={() => window.location.href = '/'}>
                  홈으로 돌아가기
                </button>
              </div>
            </div>
    );
};

export default KaKaoPaySuccess;