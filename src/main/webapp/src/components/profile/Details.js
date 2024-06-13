import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCar, FaStar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import styles from './CSS/BookingDetails.module.css';

const Details = ({data}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const {title, comment,image} = data
    const [detailsDTO, setDetailsDTO] = useState({
        car_model: '',
        rating: '',
        usagePeriod: '',
        start_num: '',
        end_num: '',
    });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const formData = new FormData();
                formData.append('param1', 'value1'); // 필요한 파라미터를 추가하세요

                const response = await axios.post('', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                setImages(response.data.images); // 응답 구조에 따라 조정이 필요할 수 있습니다.
            } catch (error) {
                console.error('이미지를 불러오는데 실패했습니다.', error);
            }
        };
        const fetchDetails = async () => {
            try {
                const response = await axios.get('여기에 상세 정보 API URL');
                setDetailsDTO(response.data); // 응답 구조에 따라 조정이 필요할 수 있습니다.
            } catch (error) {
                console.error('상세 정보를 불러오는데 실패했습니다.', error);
            }
        };
        fetchImages();
        fetchDetails();
        //이미지 5초마다 이동시키기
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
                         style={{opacity: 1, maxWidth: '500px', borderRadius: "15px"}}/>
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
                <p><FaCar className={styles.FaCar}/> 차종: {detailsDTO.car_model}</p>
                <p><FaStar className={styles.FaStar}/> 평점: {detailsDTO.rating}</p>
                <p><IoCalendarNumber className={styles.IoCalendarNumber}/> 이용기간: {detailsDTO.usagePeriod}</p>
            </div>
        </div>
    );
};

export default Details;
