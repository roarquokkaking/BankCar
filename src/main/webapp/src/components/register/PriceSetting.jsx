import React, { useState } from 'react';
import styles from "./css/PriceSetting.module.css";
import ComponentHeader from "../profile/ComponentsHeader";
import RegisterHeader from "./RegisterHeader";

const PriceSetting = () => {
  const [price, setPrice] = useState("");

  // 가격 포맷 함수
  const formatPrice = (value) => {
    return new Intl.NumberFormat("ko-KR").format(value);
  };

  const handleChange = (e) => {
    setPrice(formatPrice(e.target.value.replace(/,/g, '')));

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
              value={price}
              onChange={handleChange}
          /></div>
          <p>대여 시간: 하루 (24시간): {formatPrice(price.replace(/,/g, '') * 24)} 원</p>
        </div>
      </div>
    </>
  );
};

export default PriceSetting;