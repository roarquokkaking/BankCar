import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { IoCard } from "react-icons/io5";
import './Payment.css'
import styles from "./CheckOutPage.module.css"
import NaverPay from './NaverPay';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const Payment_main = () => {
const navigate = useNavigate();
const [date, setDate] = useState('05.24~05.25');
const [price, setPrice] = useState(119000);
const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navigateToss = useNavigate();
  const [showNaverPay, setShowNaverPay] = useState(false);

  const goNaverPay = () => {
    navigate('/payment/naverpay');
  };

  const handleClick = () => {
    navigateToss('/TossModal');
  };

    const carDetails = {
        modelName: '제네시스',
        color: '검정',
        title: '최고의 세단 제네시스를 경험해보세요.',
        imageUrl: 'data:image/jpeg;base64,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'  // 이미지 URL을 여기에 넣으세요.
    };

    const rentalDetails = {
        startDate: '2024-06-01',
        endDate: '2024-06-09'
    };

    const paymentDetails = {
        totalAmount: '₩1,200,000',
        tax: '₩120,000',
        discount: '₩100,000',
        finalAmount: '₩1,220,000'
    };

    const strongStyle = {
        display: 'inline-block',
        width: '100px'  // 원하는 너비로 설정
    };

  const [payDetail,setPayDetail]=useState({
          "cid": "TC0ONETIME",
  		"partner_order_id": "partner_order_id",
  		"partner_user_id": "partner_user_id",
  		"item_name": "초코파이",
  		"quantity": "1",
  		"total_amount": "2200",
  		"vat_amount": "200",
  		"tax_free_amount": "0",
  		"approval_url": "https://dongwoossltest.shop/success",
  		"fail_url": "https://dongwoossltest.shop/fail",
  		"cancel_url": "https://dongwoossltest.shop/cancel"
      })
      const onPay=()=>{
          axios.get("https://dongwoossltest.shop/api/payment/kakaoPay",{
              params: payDetail,
              headers:{
                'Content-Type': 'application/json'
              }
            }).then(res=>{
              window.location.href = res.data;
            }
              )
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
            <Box
                sx={{
                    padding: '20px',
                    maxWidth: '600px',
                    margin: '50px auto',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#fff',
                }}
            >
                <Typography variant="h4" component="h2" gutterBottom align="center">
                    결제 확인
                </Typography>
                <Box sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        자동차 정보
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Typography variant="body1"><strong style={strongStyle}>모델명:</strong> {carDetails.modelName}</Typography>
                            <Typography variant="body1"><strong style={strongStyle}>색상:</strong> {carDetails.color}</Typography>
                            <Typography variant="body1"><strong style={strongStyle}>제목 </strong><br /> {carDetails.title}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <img
                                src={carDetails.imageUrl}
                                alt="Car"
                                style={{ width: '100%', borderRadius: '10px' }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        대여 기간
                    </Typography>
                    <Typography variant="body1"><strong style={strongStyle}>대여 시작일:</strong> {rentalDetails.startDate}</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>반납일:</strong> {rentalDetails.endDate}</Typography>
                </Box>
                <Box sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        결제 비용
                    </Typography>
                    <Typography variant="body1"><strong style={strongStyle}>총 비용:</strong> {paymentDetails.totalAmount}</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>세금:</strong> {paymentDetails.tax}</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>할인:</strong> {paymentDetails.discount}</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>최종 금액:</strong> {paymentDetails.finalAmount}</Typography>
                </Box>
            </Box>

            {/* 결제 비용 확인하는 Box */}

            <div className='paymeans'>
                <div className='paytitle'><h4>결제 수단</h4></div>
                <button className="kakao-payment-button">
                    <img src="./image/kakaopay.png" alt="카카오페이 아이콘"onClick={onPay}/>
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
                <NaverPay/>
                <button className="IoCard-payment-button">
                    <IoCard style={{width: 40, height:68}} />
                    <div>신용카드</div>
                </button>
            </div>


    </div>
);
};

export default Payment_main;