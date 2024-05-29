import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { IoCard } from "react-icons/io5";
import './Payment.css'
const Payment_main = () => {
const navigate = useNavigate();
const [date, setDate] = useState('05.24~05.25');
const [price, setPrice] = useState(119000);
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navigateToss = useNavigate();

  const handleClick = () => {
    navigateToss('/TossModal');
  };
return (
        <div>
            <header style={{marginBottom: 20}}>
            <div className="headernav">
            <GoArrowLeft style={{width:'30px', height:'30px',
                marginTop:'4%', marginLeft:'20px'
            }}onClick={()=>{navigate(-1)}}
            />
            <h1 style={{textAlign:'center', 
                            font:'apple SD Gothic Neo',
                            fontSize:'18px',
                            marginTop:'-8%'
                           }}>주문/결제
            </h1>
            </div>
            </header>

           <div className='paymeans'>
            <div className='paytitle'><h4>결제 수단</h4></div>
                    
                    <button className="kakao-payment-button"> 
                    <img src="./image/kakaopay.png" alt="카카오페이 아이콘" />
                    </button>
                    

                
                    <button className="samsungpay-payment-button"> 
                    <img src="./image/samsungpay.png" alt="삼성페이 아이콘" />
                    </button>

                    
                    
                    <button className="toss-payment-button" onClick={handleClick}> 
                    <img src="./image/tosspay.png" alt="토스페이 아이콘" />
                    </button>
                    
                    

                    <button className="apple-payment-button"> 
                    <img src="./image/applepay.png" alt="애플페이 아이콘" />
                    </button>
                    
                    <button className="naver-payment-button"> 
                    <img src="./image/naverpay.png" alt="네이버페이 아이콘" />
                    </button>
                    
                    
                    <button className="IoCard-payment-button"> 
                    <IoCard style={{width: 40, height:68}} />
                    <div>신용카드</div>
                    </button>
                    
                </div>
        <div className="pay">
            <div className="footer">
                <div className="date-price">
                <span>{date}</span>
                <span>{price.toLocaleString('ko-KR')}원</span>
                </div>
                <div className="buttons">
                <button className="cart-button">
                    <i className="fas fa-shopping-cart"></i>
                </button>
                <button className="reservation-button">
                    결제하기
                </button>
                </div>
                <button className="scroll-to-top" onClick={scrollToTop}>
                <i className="fas fa-arrow-up"></i>
                </button>
            </div>
        </div>
    </div>
);
};

export default Payment_main;