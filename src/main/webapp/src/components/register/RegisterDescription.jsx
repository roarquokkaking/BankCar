import React from "react";
import styles from "./css/Register.module.css";

const RegisterDescription = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>It's easy to get started on BankCar</h1>
        <div className={styles.box}>
          <div className={styles.boxContent}>
            <h4>1. 당신의 자동차를 입력하세요.</h4>
            <small>
              자동차의 기본 정보를 입력하세요. 모델, 제조 연도, 색상 등을
              포함합니다.
            </small>
          </div>
          <img
            src="../image/car.png"
            alt="자동차"
            className={styles.boxImage}
          />
        </div>
        <div className={styles.box}>
          <div className={styles.boxContent}>
            <h4>2. 간단한 자동차 사진 및 설명</h4>
            <small>
              자동차의 사진을 업로드하고 간단한 설명을 추가하세요. 예를 들어,
              차량의 상태나 특징을 입력합니다.
            </small>
          </div>
          <img
            src="../image/car.png"
            alt="자동차 2"
            className={styles.boxImage}
          />
        </div>
        <div className={styles.box}>
          <div className={styles.boxContent}>
            <h4>3. Finish up and publish</h4>
            <small>
              모든 정보를 확인하고 등록을 완료하세요. 이제 당신의 자동차가
              BankCar에 성공적으로 등록됩니다.
            </small>
          </div>
          <img
            src="../image/car.png"
            alt="자동차 3"
            className={styles.boxImage}
          />
        </div>
      </div>
    </>
  );
};

export default RegisterDescription;
