import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCar, FaStar } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";
import styles from './CSS/BookingDetails.module.css';

const Details = ({detailsDTO,currentImageIndex}) => {



    return (
        <div className={styles.container}>
            <div className={styles.imageSlider}>
                {detailsDTO.images.length > 0 && (
                    <img src={detailsDTO.images[currentImageIndex].url} alt={detailsDTO.images[currentImageIndex].alt}
                         style={{opacity: 1, maxWidth: '500px', borderRadius: "15px"}}/>
                )}
            </div>
            <div className={styles.imageSlider}>
                {detailsDTO.images.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt}
                         className={styles.thumbnail}
                         style={{width: '100px', opacity: currentImageIndex === index ? 1 : 0.5}}/>
                ))}
            </div>
            <div className={styles.details}>
                <p><FaCar className={styles.FaCar}/> 차종: {detailsDTO.model}</p>
                <p><FaStar className={styles.FaStar}/> 평점: {detailsDTO.rating}</p>
                <p><IoCalendarNumber className={styles.IoCalendarNumber}/> 이용기간: {detailsDTO.usagePeriod}</p>
            </div>
        </div>
    );
};

export default Details;
