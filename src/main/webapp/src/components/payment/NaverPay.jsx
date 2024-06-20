import React from 'react';
import './Payment.module.css';
import axios from 'axios';

const NaverPay = () => {
    const handleNaverPayClick = () => {
        const script = document.createElement('script');
        script.src = 'https://nsp.pay.naver.com/sdk/js/naverpay.min.js';
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
        const oPay = window.Naver.Pay.create({
            mode: 'development',
            // payType : 'normal',
            clientId: 'HN3GGCMDdTgGUfl0kFCo',
            chainId: 'Y1ZGcFFoUThYcUp'
        });

        oPay.open({
            // merchantUserKey: 'bankcar',
            merchantPayKey: '111',
            productName: 'ㅎㅇ',
            totalPayAmount: 1000,
            taxScopeAmount: 900,
            taxExScopeAmount: 100,
            returnUrl: 'http://localhost:3000/naverpay/naverpaycompletion'
        });
        };
    };

    const handleNaverPayClick2 = () => {
        axios.get('/payment/naver', {
            params: {
                productName: "아이폰 14 pro",
                productCount: "1",
                totalPayAmount: "1400000",
                taxScopeAmount: "1400000",
                taxExScopeAmount: "0"
            }
        })
        .then(response => {
            console.log(response);
            window.location.href = "https://test-pay.naver.com/payments/" + response.data.body.reserveId;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

  return (
    <>
        <button className="naver-payment-button" onClick={handleNaverPayClick}>
            <img src="./image/naverpay.png" alt="네이버페이 아이콘" />
        </button>
    </>
  );
};

export default NaverPay;