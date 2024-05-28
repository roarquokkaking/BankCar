import React, { useState } from 'react';
import styles from "./css/PriceSetting.module.css";

const PriceSetting = () => {
  const [price, setPrice] = useState("");

  // 가격 포맷 함수
  const formatPrice = (value) => {
    return new Intl.NumberFormat("ko-KR").format(value);
  };

  const handleChange = (e) => {
    setPrice(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.priceSetting}>
          <h1>자동차 대여 서비스</h1>
          <label htmlFor="price">시간당(1시간 기준) 가격: </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={handleChange}
          />원
          <p>대여 시간: 하루 (24시간): {formatPrice(price * 24)} 원</p>
        </div>
      </div>
    </>
  );
};

export default PriceSetting;