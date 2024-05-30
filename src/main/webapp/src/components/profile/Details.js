import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCar, FaStar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import styles from './CSS/BookingDetails.module.css';

const Details = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [details, setDetails] = useState({
        carModel: '',
        rating: 0,
        usagePeriod: '',
    });

    useEffect(() => {
        // 이미지를 Naver Cloud에서 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get('여기에 Naver Cloud 이미지 API URL');
                setImages(response.data.images); // 응답 구조에 따라 조정이 필요할 수 있습니다.
            } catch (error) {
                console.error('이미지를 불러오는데 실패했습니다.', error);
            }
        };

        // 상세 정보를 다른 소스에서 가져오기
        const fetchDetails = async () => {
            try {
                // 상세 정보 API를 호출하는 코드
                // 예: const response = await axios.get('상세 정보 API URL');
                // setDetails(response.data); // 응답 구조에 따라 조정이 필요할 수 있습니다.

                // 임시 데이터로 상세 정보 설정
                setDetails({
                    carModel: '두발자전거',
                    rating: 4.5,
                    usagePeriod: '2023-04-01 to 2023-04-07',
                });

            } catch (error) {
                console.error('상세 정보를 불러오는데 실패했습니다.', error);
            }
        };

        fetchImages();
        fetchDetails();

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className={styles.container}>
            <div className={styles.imageSlider}>
                {images.length > 0 && (
                    <img src={images[currentImageIndex].url} alt={images[currentImageIndex].alt}
                         style={{opacity: 1, maxWidth: '500px', borderRadius : "15px"}}/>
                )}
            </div>
            <div className={styles.imageSlider}>
                {images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt}
                         className={styles.thumbnail}
                         style={{width: '100px', opacity: currentImageIndex === index ? 1 : 0.5}}/>
                ))}
            </div>
            <div className={styles.details}>
                <p><FaCar className={styles.FaCar}/> 차종: {details.carModel}</p>
                <p><FaStar className={styles.FaStar}/> 평점: {details.rating}</p>

                <p><IoCalendarNumber className={styles.IoCalendarNumber}/> 이용기간: {details.usagePeriod}</p>
            </div>
        </div>
    );
};

export default Details;