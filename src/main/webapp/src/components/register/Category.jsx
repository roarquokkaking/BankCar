import React from 'react';
import styles from "./css/Category.module.css";
import { FaMotorcycle, FaTruck } from "react-icons/fa";
import { GiCampingTent } from 'react-icons/gi';
import { MdBusinessCenter, MdFlightTakeoff, MdOutlineDateRange, MdOutlineElectricalServices } from 'react-icons/md';

const Category = () => {
    return (
      <>
        <h3>카테고리 선택</h3>
        <div className={styles.category}>
          <section className={styles.section}>
            <div className={styles.iconBox}>
              <GiCampingTent size={24} />
              <p>캠핑</p>
            </div>
            <div className={styles.iconBox}>
              <MdBusinessCenter size={24} />
              <p>비지니스</p>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.iconBox}>
              <MdOutlineElectricalServices size={24} />
              <p>전기차</p>
            </div>
            <div className={styles.iconBox}>
              <MdFlightTakeoff size={24} />
              <p>여행</p>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.iconBox}>
              <MdOutlineDateRange size={24} />
              <p>데이트</p>
            </div>
            <div className={styles.iconBox}>
              <MdFlightTakeoff size={24} />
              <p>스포츠카</p>
            </div>
          </section>
          <section className={styles.section}>
            <div className={styles.iconBox}>
              <FaMotorcycle size={24} />
              <p>오토바이</p>
            </div>
            <div className={styles.iconBox}>
              <FaTruck size={24} />
              <p>트럭</p>
            </div>
          </section>
        </div>
      </>
    );
};

export default Category;