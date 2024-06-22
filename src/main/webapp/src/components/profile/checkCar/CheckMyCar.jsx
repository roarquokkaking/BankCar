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
import {selectUserCarList} from "../../api/CarApiService";


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
                console.log(res.data);
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
                  (cars.length > 0 ?  (cars.map(car => (
                      <div className={styles.carouselContainer}>
                      <Slider {...settings}>
                          <RegisterCarCard key={car.carId} car={car} onAddService={onAddService}/>
                      </Slider>
                      </div>))) :
                      (<div style={{alignItems: "center"}}>
                          <img src={`${process.env.PUBLIC_URL}/image/no_car.jpg`} width={"100%"}/>
                          <span>등록된 자동차가 없습니다.</span>
                      </div>))
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
