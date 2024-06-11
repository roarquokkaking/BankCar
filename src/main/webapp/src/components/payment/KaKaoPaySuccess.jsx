import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const itemName="",totalAmount="";
    useEffect(()=>{
        itemName = params.get(itemName);
        totalAmount = params.get(totalAmount);
    },[])
    return (
        <div>
            {itemName}
            <div>{totalAmount}</div>
        </div>
    );
};

export default KaKaoPaySuccess;