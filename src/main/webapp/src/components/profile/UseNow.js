import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './CSS/UseNow.module.css';
import { FaCarSide } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineColorize } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { GiMoneyStack } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { CgNametag } from "react-icons/cg";
import ComponentHeader from "./ComponentsHeader";
import FooterMenu from "../FooterMenu";

const UseNow = () => {
    const [bookingUseDTO, setBookingUseDTO] = useState(null);
    const bookingData =useState([])
    useEffect(() => {
        // 예시 데이터 가져오기
        axios.get('https://dongwoossltest.shop/api/booking/details')
            .then(response => {
                setBookingUseDTO(response.data);
            })
            .catch(error => {
                console.error('Error fetching booking details:', error);
            });
    }, []);

    return (
        <div>
            <ComponentHeader text={"등록된 나의 자동차"} />
            <div className={styles['use-now']}>
                {bookingData && (
                    <div className={styles['image-container']}>
                        <img src={bookingData.imageUrl} alt="Car" className={styles['car-image']} />
                    </div>
                )}
                <div className={styles.details}>
                    {bookingData && (
                        <div className={styles['car-info']}>
                            <div className={styles['info-item']}><strong><FaCarSide className="icon_box" /> 모델 : </strong> {bookingUseDTO.model}</div>
                            <div className={styles['info-item']}><strong><IoCarSportOutline className="icon_box" /> 세그먼트 : </strong> {bookingUseDTO.segment}</div>
                            <div className={styles['info-item']}><strong><MdOutlineColorize className="icon_box" /> 자동차 색상:</strong> {bookingUseDTO.color}</div>
                            <div className={styles['info-item']}><strong><LuCalendarDays className="icon_box" /> 사용기간 : </strong> {bookingUseDTO.period}</div>
                            <div className={styles['info-item']}><strong><IoMdStar className="icon_box" /> 평점 : </strong> {bookingUseDTO.rating}</div>
                            <div className={styles['info-item']}><strong><GiMoneyStack className="icon_box" /> 가격 : </strong> ${bookingUseDTO.price}/day</div>
                            <div className={styles['info-item']}><strong><BiCategoryAlt className="icon_box" /> 카테고리 : </strong> {bookingUseDTO.category}</div>
                            <div className={styles['info-item']}><strong><CgNametag className="icon_box" /> host 이름 : </strong> {bookingUseDTO.userName}</div>
                        </div>
                    )}
                </div>
            </div>
            <FooterMenu />
        </div>
    );
};

export default UseNow;
