import React, { useEffect, useState } from 'react';
import '../../CSS/ChoiceCSS.css';
import "../profile/ProfilePage.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Review from '../review/Review';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from './Carousel';
import axios from 'axios';

const Choice = () => {
    const { carid } = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');
    const price = searchParams.get('price');

    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=13hvi289g6`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const mapOptions = {
                center: new window.naver.maps.LatLng(37.5666103, 126.9783882), // 서울시청 위치로 초기화
                zoom: 18,
            };
            const map = new window.naver.maps.Map('map', mapOptions);

            const marker = new window.naver.maps.Marker({
                position: mapOptions.center,
                map: map,
            });

            const success = (location) => {
                const currentPosition = new window.naver.maps.LatLng(
                    location.coords.latitude,
                    location.coords.longitude
                );
                map.setCenter(currentPosition);
                marker.setPosition(currentPosition);
            };

            const error = () => {
                console.log('Unable to retrieve your location.');
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        };

        script.onerror = () => {
            console.error('Failed to load the Naver Maps script.');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const onReserve=()=>{
        axios.post("http://localhost:8080/choice/reserve", null)
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => console.log(error))
    }

    return (
        <div>
            <header>
                {/* <div className="headernav" style={{marginBottom:'0%'}}>
                <GoArrowLeft
                    style={{
                    width: "30px",
                    height: "30px",
                    marginTop: "4%",
                    marginLeft: "20px"
                    }}
                    onClick={() => navigate(-1)}
                />
                </div> */}
            </header>
            <div className="description">
                <Carousel/>
            </div>
            <div className='car-description'>
                <h3 style={{textAlign: "-webkit-left"}}>~~차에 대한 설명~~</h3>
            </div>
            <div className="owner-description">
                <section className="user-info" style={{
                                                    display: "flex",
                                                    alignitems: "left",
                                                    paddingLeft: "20px",
                                                    margin: "0px",
                                                    justifycontent: "space-between"
                                                    }}>
                    <div className="user-img-name" > 
                        <img
                            src="https://wrtn-image-user-output.s3.ap-northeast-2.amazonaws.com/6631b6db962f730c6207b3c2/fd53f817-13a7-482c-9492-26a270549528.png"
                            alt="유저 이미지"
                            className="user-image"
                        />
                        <div className="text-info">
                            <h4>사용자 이름</h4>
                            <p>user@example.com</p>
                        </div>
                        {/* 호스트 데이터 부르기 */}
                    </div>
                </section>
            </div>
            <div className="border-line"></div>
            {/* <div className="usage-time" style={{maxwidth: "800px",
                                                margin: "0px auto",
                                                paddingLeft: "20px",
                                                border: "none"
                                                }}>
                <h2 style={{textAlign: "-webkit-left"}}>이용 시간 설정</h2>
            </div>
            <div className='input-group'>
                <div className='input-box' style={{border: "none"}}>
                    <DatePicker
                    selected={startTime}
                    onChange={(date) => setStartTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    withPortal
                    />
                    <br/>
                    <DatePicker
                    selected={endTime}
                    onChange={(date) => setEndTime(date)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={60}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    withPortal
                    />
                </div>
            </div> */}
            <div>
                <Review />
            </div>
            <div className="mapContainer">
                <div>
                    <div id="map" className='map'></div>
                </div>
            </div>
            <div className="choice-footer">
                <div className="price-time">
                    <span className="price">50,000원</span>
                    <span className="starttime">2024.06.07  17:00</span>
                    <span className='endtime'>2024.06.09  10:00</span>
                </div>
                <div className="button-container">
                    <span className="button-text" onClick={onReserve}>예약 하기</span>
                </div>
            </div>
        </div>
    );
};

export default Choice;
