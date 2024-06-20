import React, { useState } from 'react';
import '../../CSS/ChoiceCSS.css';
import "../profile/ProfilePage.css";
import 'react-datepicker/dist/react-datepicker.css';
import Review from '../review/Review';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Carousel from './Carousel';
import axios from 'axios';
import OwnerDescription from './OwnerDescription';
import ChoiceFooter from './ChoiceFooter';
import Map from './Map';

const Choice = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const carid = searchParams.get('carid');
    const startDate = searchParams.get('startdate');
    const endDate = searchParams.get('enddate');
    const price = searchParams.get('price');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const navigate = useNavigate();
    const onReserve = async () => {
        setLoading(true);
        setError(null);
        try {
            const url = `/payment?carId=${carid}&startDate=${startDate}&endDate=${endDate}&price=${price}`;
            navigate(url);
        } catch (error) {
            console.error(error);
            setError('결제 실패..');
        } finally {
            setLoading(false);
        }
    }

    const choicedata = {
        owner: {
            image: "https://wrtn-image-user-output.s3.ap-northeast-2.amazonaws.com/6631b6db962f730c6207b3c2/fd53f817-13a7-482c-9492-26a270549528.png",
            name: "사용자 이름",
            email: "user@example.com"
        },
        map: {
            address: "~~~",
            coordinates: {
                lat: 33.450701,
                lng: 126.570667
            }
        },
        footer: {
            price: "50,000",
            startTime: "2024.06.07  17:00",
            endTime: "2024.06.09  10:00",
            onReserve: onReserve,
            loading: loading,
            error: error
        }
    };

    return (
        <div>
            <header></header>
            <div className="description">
                <Carousel />
            </div>
            <div className='car-description'>
                <h3 style={{ textAlign: "-webkit-left" }}>~~차에 대한 설명~~</h3>
            </div>
            <OwnerDescription owner={choicedata.owner} />
            <div className="border-line"></div>
            <Review />
            <Map {...choicedata.map} />
            <ChoiceFooter {...choicedata.footer} />
        </div>
    );
};

export default Choice;
