import React, {useContext, useState} from 'react';
import styles from "./css/PriceSetting.module.css";
import ComponentHeader from "../profile/ComponentsHeader";
import RegisterHeader from "./RegisterHeader";
import {RegisterContext} from "./RegisterContext";

const PriceSetting = () => {
  const {data, onAddData} = useContext(RegisterContext);
  const [price, setPrice] = useState(data.price);

  // 가격 포맷 함수
  const formatPrice = (value) => {
    return new Intl.NumberFormat("ko-KR").format(value);
  };

  const handleChange = (e) => {
    setPrice(e.target.value.replace(/,/g, ''));   // 숫자로 변경 후 price 변수에 저장
    onAddData("price", e.target.value.replace(/,/g, ''))
  };

  return (
    <>
      <RegisterHeader text={"자동차 대여 금액"} />
      <div className={styles.container}>
        <div className={styles.priceSetting}>
          <label htmlFor="price">시간당(1시간 기준) 가격: </label>
          <div className={styles.inputWrapper}>
          <span className={styles.currency}>₩</span>
          <input
              type="text"
              className={styles.priceInput}
              id="price"
              name="price"
              value={formatPrice(price)}
              onChange={handleChange}
          /></div>
          <p>대여 시간: 하루 (24시간): {formatPrice(price * 24)} 원</p>
        </div>
      </div>
    </>
  );
};

export default PriceSetting;