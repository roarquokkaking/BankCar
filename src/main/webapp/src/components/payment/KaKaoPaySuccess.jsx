import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const [pg_token,setPg_token]=useState('');
    const [payDetail,setPayDetail]=useState(null);
    useEffect(()=>{
        setPg_token(params.get('pg_token'));
        
        axios.get("https://dongwoossltest.shop/api/payment/success",{
            params:{
                pg_token
            },
            
        }).then(res=>
            {
                setPayDetail(res.data);
            }
        )
    },[params])

    return (
        <div>
           {payDetail.item_name}
        </div>
    );
};

export default KaKaoPaySuccess;