import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const [payDetail,setPayDetail]=useState({
        itemName:"",
        totalAmount:""

    })
    useEffect(()=>{
        setPayDetail({
            itemName:params.get('itemName'),
            totalAmount:params.get('totalAmount')
        })
        
    },[])
    return (
        <div>
            {payDetail.itemName}
            <div>{payDetail.totalAmount}</div>
        </div>
    );
};

export default KaKaoPaySuccess;