import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaCar, FaStar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import { GoArrowLeft } from "react-icons/go";
import Box from "@mui/material/Box";
import styles from './CSS/BookingDetails.module.css';
import FooterMenu from "../FooterMenu";

const BookingDetails = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [memo, setMemo] = useState('');
    const [details, setDetails] = useState({
        car_model: '',
        rating: 0,
        start_date: '',
        end_date: '',
        usagePeriod: ''
    });
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detailsResponse = await axios.get('http://localhost:8080/api/details');
                const imagesResponse = await axios.get('https://navercloudapi.com/images');
                setDetails({
                    ...detailsResponse.data,
                    usagePeriod: `${detailsResponse.data.startDate} - ${detailsResponse.data.endDate}`
                });
                setImages(imagesResponse.data.images);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const navigate = useNavigate();

    const updateMemo = async () => {
        try {
            await axios.post('http://localhost:8080/api/memo', { memo });
            alert('메모가 저장되었습니다.');
        } catch (error) {
            console.error('Error sending memo:', error);
        }
    };

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
                        <img src={images[currentImageIndex]?.url} alt={images[currentImageIndex]?.alt}
                             className={styles.bigSlider} />
                    </div>
                    <div className={styles.imageSlider}>
                        {images.map((image, index) => (
                            <img key={index} src={image.url} alt={image.alt}
                                 className={styles.thumbnail}
                                 style={{ width: '100px', opacity: currentImageIndex === index ? 1 : 0.5 }} />
                        ))}
                    </div>
                    <div className={styles.details}>
                        <p><FaCar className={styles.FaCar} /> 차종: {details.carModel}</p>
                        <p><FaStar className={styles.FaStar} /> 평점: {details.rating}</p>
                        <p><IoCalendarNumber className={styles.IoCalendarNumber} /> 이용기간: {details.usagePeriod}</p>
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
