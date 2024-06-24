import React, { useState } from 'react';
import '../../CSS/ChoiceCSS.css';
import "../profile/ProfilePage.css";
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate} from "react-router-dom";
import Carousel from './Carousel';
import OwnerDescription from './OwnerDescription';
import ChoiceFooter from './ChoiceFooter';
import Map from './Map';
import ChoiceData from './ChoiceData';
import {useSelector} from "react-redux";
import UserReview from "../review/UserReview";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Choice = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const carid = searchParams.get('carid');
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');
    const startTime = searchParams.get('starttime');
    const endTime = searchParams.get('endtime');

    const userId = useSelector((state) => state.Login.id);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInfoExpanded, setIsInfoExpanded] = useState(false);

    const navigate = useNavigate();
    const onReserve = async () => {
        setLoading(true);
        setError(null);
        try {
            //const url = `/payment?userid=${userId}&carid=${carid}&startdate=${startDate}&enddate=${endDate}&starttime=${startTime}&endtime=${endTime}&price=${choicedata.footer.price}`;
            const url = `/payment?userid=${userId}&carid=${carid}&startdate=2024-06-25&enddate=2024-06-27&starttime=12:00&endtime=18:00&price=100000`;
            navigate(url);
        } catch (error) {
            console.error(error);
            setError('결제 실패..');
        } finally {
            setLoading(false);
        }
    }

    const [choicedata, setChoicedata] = useState({
        car: {
            title:"",
            content:"",
            image: {},
            category: "",
            model:"",
            released:"",
            color:"",
            segment:"",
        },
        owner: {
            image: "",
            // userid:"",
            name: "",
            email: "",
            rating: 0,
        },
        map: {
            address: "",
            coordinates: {
                lat: 0,
                lng: 0
            }
        },
        review: {
            review_id:"",
            rating: 0,
            title: "",
            comment: "",
            id: "",
            name: ""
        },
        footer: {
            price: 0,
            startTime: startTime,
            endTime: endTime,
            startDate:startDate,
            endDate:endDate,
            loading: loading,
            error: error
        }
    });
    const toggleInfo = () => {
        setIsInfoExpanded(!isInfoExpanded);
    };

    return (
        <div className="choice-container">
            <ChoiceData setChoicedata={setChoicedata}/>
            <div className="description">
                <Carousel {...choicedata.car} />
            </div>
            {/*<div className="choice-details">*/}
            {/*    <div className="choice-rating">*/}
            {/*        <p>Rating: {choicedata.car.rating}</p>*/}
            {/*    </div>*/}
            {/*    <div className="choice-amenities">*/}
            {/*        <div className="choice-icon">🚗</div>*/}
            {/*        <p>{choicedata.car.category}</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="car-description">
                <h1>{choicedata.car.title}</h1>
                <p>{choicedata.car.content}</p>
            </div>
            {isInfoExpanded && (
                <div className="choice-info">
                    <p className="choice-location">{choicedata.map.address}</p>
                    <p className="choice-location">카테고리: {choicedata.car.category}</p>
                    <p className="choice-location">모델: {choicedata.car.model}</p>
                    <p className="choice-location">출시일: {choicedata.car.released}</p>
                    <p className="choice-location">색상: {choicedata.car.color}</p>
                    <p className="choice-location">분류: {choicedata.car.segment}</p>
                </div>
            )}
            <button onClick={toggleInfo} className="toggle-info-button">
                {isInfoExpanded ? (
                    <>
                        세부정보 접기 <IoIosArrowUp />
                    </>
                ) : (
                    <>
                        세부정보 보기 <IoIosArrowDown />
                    </>
                )}
            </button>
            <OwnerDescription owner={choicedata.owner}/>
            <UserReview {...choicedata.review} reviews={choicedata.review}/>
            <Map {...choicedata.map} />
            <ChoiceFooter {...choicedata.footer} onReserve={onReserve}/>
        </div>
    );
};

export default Choice;
