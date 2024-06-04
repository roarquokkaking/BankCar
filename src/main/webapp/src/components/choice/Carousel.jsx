import React, { useState } from 'react';
import { locations as cardLocations } from '../../data/mock-data';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { PiArrowFatLeftFill } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
    const navigate = useNavigate();

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
                {locationImages.map((step, index) => (
                    <div key={step.id}>
                        <img
                            src={step.url}
                            alt={step.id}
                            style={{ maxWidth: '100%', height: 'auto' }}
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