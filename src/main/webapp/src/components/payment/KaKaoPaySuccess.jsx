import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/payment.module.css';
import Swal from "sweetalert2";
import {useChoice} from "../choice/ChoiceProvider";

const KaKaoPaySuccess = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const params=new URLSearchParams(location.search);
    const [pg_token,setPg_token]=useState('');
    const [payDetail,setPayDetail]=useState({});
    const { choicedata } = useChoice();

    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
  })

    const formatPrice = (value) => {
        return new Intl.NumberFormat("ko-KR").format(value);
    };

    useEffect(()=>{
        setPg_token(params.get('pg_token'));
        
    },[params])

    
    useEffect(()=>{
        
        if(pg_token){
            // alert(pg_token);
        axios.get("https://dongwoossltest.shop/api/payment/success",{
            params:{
                pgToken:pg_token
            }
        }).then(res=>
            {
                setPayDetail(res.data);
                Toast.fire({
                  icon: 'success',
                  title: '차량 예약 완료!!'
              })
                console.log(res.data);
            }
        ).catch(err=>console.log(err))
    }
    },[pg_token])


    return (
        <div className={styles["App"]}>
      <div className={styles["confirmation-container"]}>
        <div className={styles["icon"]}>
          <img src={`${process.env.PUBLIC_URL}/image/paySuccess.png`} alt="Success Icon" />
        </div>
        <br></br>
        <h1>결제가 완료되었습니다!</h1>
        <p>대여가 성공적으로 완료되었습니다. .</p>
        
        <div className={styles["order-details"]}>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-title"]}>예약 차량:</span>
            <span className={styles["detail-content"]}>{payDetail.item_name}</span>
          </div>
          <br></br>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-title"]}>결제 금액:</span>
            <span className={styles["detail-content"]}>{formatPrice(payDetail.total_amount * 1.1)} 원</span>
          </div>
          <br></br>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-title"]}>결제 방법:</span>
            <span className={styles["detail-content"]}>카카오 페이</span>
          </div>
          <br></br>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-title"]}>대여 주소:</span>
            <span className={styles["detail-content"]}>{payDetail.quantity}</span>
          </div>
          <br></br>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-title"]}>대여 시작일:</span>
            <span className={styles["detail-content"]}>{payDetail.vat_amount} {payDetail.fail_url}</span>
          </div>
          <br></br>
          <div className={styles["detail-item"]}>
            <span className={styles["detail-title"]}>대여 반납일:</span>
            <span className={styles["detail-content"]}>{payDetail.tax_free_amount} {payDetail.cancel_url}</span>
          </div>
          <br></br>
        </div>
        <br></br>
        <button className={styles["home-button"]} onClick={() => navigate('/')}>
          확인
        </button>
      </div>
    </div>
    );
};

export default KaKaoPaySuccess;