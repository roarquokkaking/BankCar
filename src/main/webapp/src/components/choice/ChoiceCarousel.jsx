import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { locations as cardLocations } from '../../data/mock-data';

const ChoiceCarousel = () => {
    const [cards] = useState(cardLocations);
    const [activeStep, setActiveStep] = useState(0);

    if (!cards.length) {
        return null;
    }

    const locationImages = cards[0].locationImages;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    const settings = {
        dots: true,          // 캐러셀 밑에 ... 을 표시할지
        infinite: false,      // 슬라이드가 끝까지 가면 다시 처음으로 반복
        autoplay: false,      // 자동 재생
        slidesToShow: 1,     // 한 번에 보여줄 슬라이드 개수
        slidesToScroll: 1,   // 한 번에 넘어가는 슬라이드 개수
        nextArrow: <NextArrow />, // 화살표 버튼을 커스텀해서 사용
        prevArrow: <PrevArrow />,
    };

    return (
        <div>
            <Slider {...settings}>
                {locationImages.map((step, index) => (
                    <div key={step.id}>
                        <img src={step.url} alt={step.id} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ChoiceCarousel;