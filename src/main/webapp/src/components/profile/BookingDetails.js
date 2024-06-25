import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate, useParams} from "react-router-dom";
import { FaCar, FaStar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import Box from "@mui/material/Box";
import styles from './CSS/BookingDetails.module.css';
import FooterMenu from "../FooterMenu";
import {useSelector} from "react-redux";

const BookingDetails = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [memo, setMemo] = useState('');
    const [images, setImages] = useState([]);//3개여서 배열
    const {car_id}=useParams()
    const user_id = useSelector(state => state.Login.id)
    const navigate = useNavigate();
    const [detailsDTO, setDetailsDTO] = useState([]);

    /*서버에 정보 보내기 */
    useEffect(() => {

        axios.get(`https://dongwoossltest.shop/Booking/bookingDetail/${user_id}/${car_id}`)
            .then((response)=>response.data(setDetailsDTO()))
            .catch((error)=>console.log(error))
    }, [user_id]);



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]); // 여기서 images.length 의존성을 유지


    const updateMemo = async () => {
        try {
            await axios.post('https://dongwoossltest.shop/api/Booking/bookingDetail/memo', {
                memo:memo,
                user_id: user_id,
                // booking_id : booking_id,
            });
            alert('메모가 저장되었습니다.');
        } catch (error) {
            console.error('Error sending memo:', error);
        }
    };
    let imageList = 'https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/';


    return (
        <div className={styles.container}>
            <Box sx={{ pb: 7 }}>
                <header>
                    <div className="headernav">
                        <GoArrowLeft
                            style={{
                                width: "30px",
                                height: "30px",
                                marginTop: "4%",
                                marginLeft: "20px",
                            }}
                            onClick={() => navigate(-1)}
                        />
                        <h2 className={styles.content}>상세페이지</h2>
                    </div>
                </header>
                <div>
                    <div className={styles.imageSlider}>
                        <img src={imageList+images[currentImageIndex]?.url}
                             alt={images[currentImageIndex]?.alt}
                             className={styles.bigSlider} />
                    </div>
                    <div className={styles.imageSlider}>
                        {images.map((image, index) => (
                            <img key={index} src={image.url} alt={image.alt}
                                 className={styles.thumbnail}
                                 style={{ width: '100px'
                                     , opacity: currentImageIndex === index ? 1 : 0.5 }} />
                        ))}
                    </div>
                    <div className={styles.details}>
                        <p><FaCar className={styles.FaCar} /> 차종: {detailsDTO.car_model}</p>
                        <p><FaStar className={styles.FaStar} /> 평점: {detailsDTO.rating}</p>
                        <p><IoCalendarNumber className={styles.IoCalendarNumber} /> 이용기간: {detailsDTO.usagePeriod}</p>
                    </div>


                    <div className={styles.buttonDiv}>
                        <textarea className={styles.textarea} value={memo} onChange={(e) => setMemo(e.target.value)} />
                        <button className={styles.button} onClick={updateMemo}>수정하기</button>
                    </div>
                </div>
            </Box>
            <FooterMenu />
        </div>
    );
};

export default BookingDetails;
