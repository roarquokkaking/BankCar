import React, { useState } from 'react';
import { locationss as cardLocations } from '../../data/mock-data';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiArrowFatLeftFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const Carousel = ({image}) => {
    const navigate = useNavigate();

    const images = [
        image.image1 && `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${image.image1}`,
        image.image2 && `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${image.image2}`,
        image.image3 && `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${image.image3}`,
        image.image4 && `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${image.image4}`,
        image.main_image && `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${image.main_image}`
    ].filter(image => image !== null && image !== undefined); // null 또는 undefined인 이미지 제외


    const [cards] = useState(cardLocations);
    const locationImages = cards[0].locationImages;
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div style={{ position: 'relative' }}> {/* 부모 요소에 position: relative; 추가 */}
            <Slider {...settings}>
                {images.map((imageUrl, index) => (
                    <div key={index}>
                        <img
                            src={imageUrl} alt={`Car Image ${index}`}
                            style={{ width: '400px', height: '250px',  objectFit:'cover', display:'block' }}
                        />
                    </div>
                ))}
            </Slider>
            <br/>
            <PiArrowFatLeftFill  
                style={{
                    width: "30px",
                    height: "30px",
                    marginTop: "4%",
                    marginLeft: "20px",
                    position: "absolute",
                    top: "4px", 
                    left: "4px"
                }}
                onClick={() => navigate(-1)}
            />
        </div>
    );
};

export default Carousel;