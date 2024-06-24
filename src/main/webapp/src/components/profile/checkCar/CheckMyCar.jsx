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
import {deleteCarApi, getServiceCarList, selectUserCarList} from "../../api/CarApiService";
import Swal from "sweetalert2";


const CheckMyCar = () => {
    const navigate = useNavigate();
    const userId = useSelector((state) => state.Login.id);
    const [service, setService] = useState(0)
    const [cars, setCars] = useState([]);
    const [change, setChange] = useState(false)
    console.log(userId);


    useEffect(() => {
        selectUserCarList(userId)
            .then(res => {
                setCars(res.data);
                console.log(res.data);
                setChange(false)
            })
            .catch(error => console.log(error))
    },[change])

    useEffect(() => {
        getServiceCarList(carId)
            .then(res => {

            })
    })

    const onAddService = (carId) => {
        setService(carId)
    }

    const onDeleteCar = (carId) => {
        Swal.fire({
            text: "정말로 삭제하시겠습니까? 등록된 서비스 정보도 사라집니다.",
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '승인',
            cancelButtonText: '취소',
            reverseButtons: true, // 버튼 순서 거꾸로
        }).then((result) => {
            console.log("userId, carId : " + userId +" / "+ carId)
            if (result.isConfirmed) {
                deleteCarApi(userId, carId)
                    .then(res => {
                        setChange(true);
                        Swal.fire(
                            '삭제되었습니다.',
                        )
                    })

            }
        })

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
                    (cars.length > 0 ?
                        (<div className={styles.carouselContainer}>
                                {cars.length === 1 ? (
                                    <RegisterCarCard key={cars[0].carId} car={cars[0]} onAddService={onAddService} onDeleteCar={onDeleteCar} />
                                ) : (
                                    <Slider {...settings}>
                                        {cars.map(car => (
                                            <RegisterCarCard key={car.carId} car={car} onAddService={onAddService} onDeleteCar={onDeleteCar}/>
                                        ))}
                                    </Slider>
                                )}
                            </div>
                    ) : (
                        <div style={{alignItems: "center"}}>
                            <img src={`${process.env.PUBLIC_URL}/image/no_car.jpg`} width={"100%"}/>
                            <span>등록된 자동차가 없습니다.</span>
                        </div>
                    ))
                :
                <div>
                    <DateTimeSelector carId={service}/>
                </div>
            }
        </div>
    );
};

export default CheckMyCar;
