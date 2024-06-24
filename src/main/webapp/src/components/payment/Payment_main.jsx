import React, {useEffect, useState} from 'react';
import {useNavigate, useParams,useLocation} from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import { IoCard } from "react-icons/io5";
import styles from './Payment.module.css'
import NaverPay from './NaverPay';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {getCarItemApi} from "../api/CarApiService";
import {useSelector} from "react-redux";
import axios from "axios"
import {useChoice} from "../choice/ChoiceProvider";



//{carId, startDate, endDate, price}
const Payment_main = () => {
  const navigate = useNavigate();
  const navigateToss = useNavigate();
  const [showNaverPay, setShowNaverPay] = useState(false);
  const { choicedata } = useChoice();
  const goNaverPay = () => {
    navigate('/payment/naverpay');
  };

  const handleClick = () => {
    navigateToss('/TossModal');
  };

    // 결제 화면 정보 가져오기
    const userId = useSelector(state => state.Login.id)
    // 파라미터로 넘어오는 변수 : carId, startDate, startTime, endDate, endTime, price
    const location = useLocation();

    const parseDateTime = (date, time) => {
        return new Date(`${date}T${time}`);
    }

    const queryParams = new URLSearchParams(location.search);

    const carId = queryParams.get('carid');
    const startDate = choicedata.footer.startDate;
    const endDate = choicedata.footer.endDate;
    const startTime = choicedata.footer.startTime;
    const endTime = choicedata.footer.endTime;
    const price = choicedata.footer.price;
    const [car, setCar] = useState({})
    // const totalDate = choicedata.footer.endDate - choicedata.footer.startDate ;
    // const totalTime = choicedata.footer.endTime - choicedata.footer.startTime ;

    // Date 객체로 변환
    const startDateTime = parseDateTime(startDate, startTime);
    const endDateTime = parseDateTime(endDate, endTime);

// 날짜 차이 계산 (일 단위)
    const totalDate = (endDateTime - startDateTime) / (1000 * 60 * 60 * 24);

// 시간 차이 계산 (시간 단위)
    const startHour = new Date(`1970-01-01T${startTime}Z`);
    const endHour = new Date(`1970-01-01T${endTime}Z`);
    const totalTime = (endHour - startHour) / (1000 * 60 * 60);

    // const [rentalDetails, setRentalDetails] = useState({
    //     startDate,
    //     startTime,
    //     endDate,
    //     endTime
    // })
    const [payDetail,setPayDetail]=useState({
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "초코파이",
        total_amount: '',
        quantity: "1",        // 도로명
        vat_amount: "200",    // 대여 시작 날짜
        tax_free_amount: "0", // 반납 날짜
        approval_url: "https://dongwoossltest.shop/success",
        fail_url: "",     //      대여 시작 시간
        cancel_url: "",   //      대여 반납 시간
        car_id:carId,
        totalPayment:''
    })

  useEffect(() => {
      console.log(carId)
      getCarItemApi(userId, carId)
          .then(response => {
              console.log(response.data)
              setCar(response.data)
          })
              .catch(error => console.log(error))
      },[carId])


    useEffect(() => {
        if(car){
            setPayDetail({...payDetail,
                item_name: choicedata.car.model,
                quantity: choicedata.map.address,
                vat_amount: startDate,
                tax_free_amount: endDate ,
                total_amount: price,
                fail_url: startTime ,
                cancel_url: endTime,
                totalPayment: totalPayment})
            console.log(payDetail)
        }
    },[car])

    useEffect(() => {
        console.log(payDetail)
    }, [payDetail])

    const strongStyle = {
        display: 'inline-block',
        width: '100px'  // 원하는 너비로 설정
    };

    // 가격 포맷 함수
    const formatPrice = (value) => {
        return new Intl.NumberFormat("ko-KR").format(value);
    };


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
      const totalPayment = payDetail.total_amount * ((totalDate * 24) + totalTime);

    const onBtn = () => {
        Notification.requestPermission().then(param => {
            if(param === 'granted'){
                console.log("granted")
                const notification = new Notification("Example notification",{
                    body: "hello friend",
                    data: {userId}
                })
                notification.addEventListener("error", e => {
                    console.error("Notification error: ", e);
                });

                notification.addEventListener("show", () => {
                    console.log("Notification shown");
                });

                notification.addEventListener("click", () => {
                    console.log("Notification clicked");
                });
            }else {
                console.log("Notification permission denied");
            }
        })
    }

return (
        <div>
            <header style={{marginBottom: 20}}>
                <div className={styles.headernav}>
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
            {/*<button onClick={onBtn}> click </button>*/}
            <Box
                sx={{
                    padding: '20px',
                    maxWidth: '100%',
                    margin: '50px auto',
                    border: '1px solid #ddd',
                    borderRadius: '10px',
                    //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
                            <Typography variant="body1"><strong style={strongStyle}>모델명:</strong> {choicedata.car.model}</Typography>
                            <Typography variant="body1"><strong style={strongStyle}>색상:</strong> {choicedata.car.color}</Typography>
                            <Typography variant="body1"><strong style={strongStyle}>제목 </strong><br /> {choicedata.car.title}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            {car && car.carImages && car.carImages.main_image &&
                                <img
                                    src={`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${car.carImages.main_image}`}
                                    alt="Car"
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />}
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        대여 기간
                    </Typography>
                    <Typography variant="body1"><strong style={strongStyle}>시작일:</strong> {startDate} / {startTime}</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>반납일:</strong> {endDate} / {endTime}</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>총 {totalDate}일 {totalTime }시간</strong></Typography>
                </Box>
                <Box sx={{ padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
                    <Typography variant="h6" component="h3" gutterBottom>
                        결제 비용
                    </Typography>
                    <Typography variant="body1"><strong style={strongStyle}>총 비용:</strong> {formatPrice(totalPayment)} 원</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>세금:</strong> {formatPrice(totalPayment * 0.1)} 원</Typography>
                    <Typography variant="body1"><strong style={strongStyle}>최종 금액:</strong> {formatPrice(totalPayment * 1.1)} 원</Typography>
                </Box>
            </Box>


            <div className={styles.paymeans}>
                <div className={styles.paytitle}><h4>결제 수단</h4></div>
                <button>
                    <img src="./image/kakaopay.png" alt="카카오페이 아이콘" onClick={onPay} style={{ width: '100px', height: 'auto' }} />
                </button>
                <button>
                    <img src="./image/samsungpay.png" alt="삼성페이 아이콘" style={{ width: '100px', height: 'auto' }} />
                </button>
                <button onClick={handleClick}>
                    <img src="./image/tosspay.png" alt="토스페이 아이콘" style={{ width: '100px', height: 'auto' }} />
                </button>
                <button>
                    <img src="./image/applepay.png" alt="애플페이 아이콘" style={{ width: '100px', height: 'auto' }} />
                </button>
                <NaverPay />
                <button className={styles.IoCardPaymentButton}>
                    <IoCard style={{ width: 40, height: 68 }} />
                    <div>신용카드</div>
                </button>
            </div>

    </div>
);
};

export default Payment_main;
