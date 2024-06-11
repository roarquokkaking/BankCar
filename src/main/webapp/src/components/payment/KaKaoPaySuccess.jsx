import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const params=new URLSearchParams(location.search);
    const [pg_token,setPg_token]=useState('');
    useEffect(()=>{
        setPg_token(params.get('pg_token'));
        
    },[params])
    return (
        <div>
            {pg_token}
        </div>
    );
};

export default KaKaoPaySuccess;