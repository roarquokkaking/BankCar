import axios from 'axios';
import React, { useState } from 'react';



const KaKaoPay = () => {

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
            <input type='button' value="결제하기"  onClick={onPay}/>
        </div>
    );
};

export default KaKaoPay;