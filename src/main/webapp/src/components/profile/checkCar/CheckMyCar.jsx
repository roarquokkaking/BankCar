import React from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ComponentHeader from '../ComponentsHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RegisterCarCard from "./RegisterCarCard";
import styles from "./CheckMyCar.module.css"
import FooterMenu from "../../FooterMenu";


const cars = [
    { carId: 1, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
    { carId: 2, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
    { carId: 3, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
    { carId: 4, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
    // 더 많은 자동차 데이터를 추가하세요
];

const CheckMyCar = () => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
      <div className={styles.checkMyCarContainer}>
          <ComponentHeader text={"등록된 나의 자동차" } />
          <div className={styles.carouselContainer}>
              <Slider {...settings}>
                  {cars.map(car => (
                      <RegisterCarCard key={car.carId} car={car}/>
                  ))}
              </Slider>
          </div>
        
      </div>
    );
};

export default CheckMyCar;