import React from 'react';
import axios from 'axios';

const NaverPayCompletion = ({ paymentId }) => {
    // API 요청에 필요한 데이터 구성
    const requestData = {
        paymentId: paymentId
    };

    // API 요청 헤더 설정
    const headers = {
        'X-Naver-Client-Id': 'HN3GGCMDdTgGUfl0kFCo',
        'X-Naver-Client-Secret': 'ftZjkkRNMR',
        'X-NaverPay-Chain-Id': 'Y1ZGcFFoUThYcUp',
        'X-NaverPay-Idempotency-Key': 'np_rlqoc664565'
    };

    // Axios를 사용하여 API 호출
    axios.post('https://dev.apis.naver.com/naverpay-partner/naverpay/payments/v2.2/apply/payment', requestData, { headers })
        .then(response => {
            // API 요청이 성공했을 때 수행할 작업
            console.log(response.data);
        })
        .catch(error => {
            // API 요청이 실패했을 때 수행할 작업
            console.error('Error:', error);
        });
        
    return (
        <div>
            
        </div>
    );
};

export default NaverPayCompletion;
