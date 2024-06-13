import React, {useEffect, useState} from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ComponentHeader from '../ComponentsHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RegisterCarCard from "./RegisterCarCard";
import styles from "./CheckMyCar.module.css"
import DateTimeSelector from "./DateTimeSelector";
import {useSelector} from "react-redux";
import {selectUserCarList} from "../../register/api/CarApiService";


// const cars = [
//     { carId: 1, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
//     { carId: 2, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
//     { carId: 3, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
//     { carId: 4, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment:"대형", doro_address:"테헤란로", title: "제목 입니다.", content: "내용 입니다." },
//     // 더 많은 자동차 데이터를 추가하세요
// ];

const CheckMyCar = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.Login.id);
    const [service, setService] = useState(0)
    const [cars, setCars] = useState([]);
    console.log(userId);


    useEffect(() => {
        selectUserCarList(userId)
            .then(res => {
                setCars(res.data);
                console.log(cars);
            })
            .catch(error => console.log(error))
    },[])

    const onAddService = (carId) => {
        setService(carId)
    }

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
          {
              service === 0
                  ?
                  <div className={styles.carouselContainer}>
                      <Slider {...settings}>
                          {cars.map(car => (
                              <RegisterCarCard key={car.carId} car={car} onAddService={onAddService}/>
                          ))}
                      </Slider>
                  </div>
                  :
                  <div>
                      <h1>서비스 등록</h1>
                      <DateTimeSelector carId={service}/>
                  </div>
          }
      </div>
    );
};

export default CheckMyCar;