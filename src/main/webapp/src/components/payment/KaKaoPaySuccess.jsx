import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
            alert(pg_token);
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
        <div>
           {payDetail.item_name}
           <div>{payDetail.total_amount}</div>
        </div>
    );
};

export default KaKaoPaySuccess;