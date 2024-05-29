import React, {useState} from 'react';
import styles from "./css/Category.module.css";
import {FaCar, FaMotorcycle, FaTruck} from "react-icons/fa";
import {GiCampingTent} from 'react-icons/gi';
import {MdBusinessCenter, MdFlightTakeoff, MdOutlineDateRange, MdOutlineElectricalServices} from 'react-icons/md';
import RegisterHeader from "./RegisterHeader";

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState({})

    const handleIconClick = (category) => {
        setSelectedCategory({...selectedCategory, category});
    };
    return (
        <>
            <RegisterHeader text={"카테고리"}/>
            <div className={styles.category}>
                <section className={styles.section}>
                    <div className={styles.iconBox} onClick={() => handleIconClick('캠핑')}>
                        <GiCampingTent size={24}/>
                        <p>캠핑</p>
                    </div>
                    <div className={styles.iconBox} onClick={() => handleIconClick('비지니스')}>
                        <MdBusinessCenter size={24}/>
                        <p>비지니스</p>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.iconBox} onClick={() => handleIconClick('전기차')}>
                        <MdOutlineElectricalServices size={24}/>
                        <p>전기차</p>
                    </div>
                    <div className={styles.iconBox} onClick={() => handleIconClick('여행')}>
                        <MdFlightTakeoff size={24}/>
                        <p>여행</p>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.iconBox} onClick={() => handleIconClick('데이트')}>
                        <MdOutlineDateRange size={24}/>
                        <p>데이트</p>
                    </div>
                    <div className={styles.iconBox} onClick={() => handleIconClick('스포츠카')}>
                        <FaCar size={24}/>
                        <p>스포츠카</p>
                    </div>
                </section>
                <section className={styles.section}>
                    <div className={styles.iconBox} onClick={() => handleIconClick('오토바이')}>
                        <FaMotorcycle size={24}/>
                        <p>오토바이</p>
                    </div>
                    <div className={styles.iconBox} onClick={() => handleIconClick('트럭')}>
                        <FaTruck size={24}/>
                        <p>트럭</p>
                    </div>
                </section>
            </div>
            {selectedCategory.category}
        </>
    );
};

export default Category;