import React, { useEffect, useState } from 'react';
import '../../CSS/ChoiceCSS.css';
import "../profile/ProfilePage.css";
import 'react-datepicker/dist/react-datepicker.css';
import Review from '../review/Review';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from './Carousel';
import axios from 'axios';
import { Map, MapMarker, useKakaoLoader,StaticMap } from 'react-kakao-maps-sdk';

const Choice = () => {
    const { carid } = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');
    const price = searchParams.get('price');

    const navigate = useNavigate();

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
            <div>
                <Review />
            </div>

            <div className="mapContainer">
                <div>
                    <span>주소지 : ~~~</span>
                </div>
                <StaticMap // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: 33.450701,
                        lng: 126.570667
                    }}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "480px",
                    }}
                    marker={{
                        lat: 33.450701,
                        lng: 126.570667
                    }}
                    level={3}
                />
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
