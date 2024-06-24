import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";
import { baseURL } from '../../data/UrlTransform';

const ChoiceData = ({ setChoicedata }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [choiceDTO, setChoiceDTO] = useState({
        carId: searchParams.get('carid'),
        userId: '', // 필요한 경우 설정
        startDate: searchParams.get('startdate'),
        endDate: searchParams.get('enddate'),
        startTime: searchParams.get('starttime'),
        endTime: searchParams.get('endtime'),
        jibunAddress: '',
        roadAddress: '',
        x: '',
        y: '',
        price: ''
    });
    const [carInfo, setCarInfo] = useState(null);
    const [hostInfo, setHostInfo] = useState(null);
    const [reviewInfo, setReviewInfo] = useState([]);

    const startDate = choiceDTO.startDate;
    const endDate = choiceDTO.endDate;
    const startTime = choiceDTO.startTime;
    const endTime = choiceDTO.endTime;

    const parseDateTime = (date, time) => {
        return new Date(`${date}T${time}`);
    }

    // Date 객체로 변환
    const startDateTime = parseDateTime(startDate, startTime);
    const endDateTime = parseDateTime(endDate, endTime);

// 날짜 차이 계산 (일 단위)
    const totalDate = (endDateTime - startDateTime) / (1000 * 60 * 60 * 24);

// 시간 차이 계산 (시간 단위)
    const startHour = new Date(`1970-01-01T${startTime}Z`);
    const endHour = new Date(`1970-01-01T${endTime}Z`);
    const totalTime = (endHour - startHour) / (1000 * 60 * 60);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(choiceDTO);
                const responseCar = await axios.get(`${baseURL}/choice/carinfo`, {
                    params: {
                        carId: choiceDTO.carId
                    }
                });
                // 서버에서 가져온 데이터로 필요한 작업 수행
                console.log(responseCar.data);
                setCarInfo(responseCar.data); // 차량  정보 설정
                const totalPayment = responseCar.data.price * ((totalDate * 24) + totalTime);
                console.log("carinfo : "+carInfo)
                //호스트정보
                const responseHost = await axios.get(`${baseURL}/choice/hostinfo`, {
                    params: {
                        userId: responseCar.data.user.id // 예시로 사용자 ID를 요청 파라미터로 설정
                    }
                });
                console.log(responseHost.data);
                setHostInfo(responseHost.data); // 호스트 정보 설정

            //     리뷰정보
                // reviewInfo 요청
                const responseReview = await axios.get(`${baseURL}/choice/reviewinfo`, {
                    params: {
                        carId: choiceDTO.carId // 예시로 차량 ID를 요청 파라미터로 설정
                    }
                });
                console.log(responseReview.data);
                setReviewInfo(responseReview.data); // 리뷰 정보 설정
                const reviews = responseReview.data.map(review => ({
                    rating: review.rating,
                    title: review.title,
                    comment: review.comment,
                    id: review.loginDTO.id,
                    name: review.loginDTO.name
                }));

            //     데이터 삽입
                setChoicedata({
                    car:{
                        title: responseCar.data.title,
                        content: responseCar.data.content,
                        image: responseCar.data.carImages,
                        category: responseCar.data.category,
                        model:responseCar.data.model,
                        released:responseCar.data.released,
                        color:responseCar.data.color,
                        segment:responseCar.data.segment,
                    },
                    owner: {
                        image: responseCar.data.user.profile_image,
                        name: responseCar.data.user.name,
                        email: responseCar.data.user.email,
                        rating: responseCar.data.rating
                    },
                    map: {
                        address: responseCar.data.jibunAddress,
                        coordinates: {
                            lat: parseFloat(responseCar.data.latitude),
                            lng: parseFloat(responseCar.data.longitude)
                        }
                    },
                    review: reviews,
                    footer: {
                        price: totalPayment,
                        startTime: startTime,
                        endTime: endTime,
                        startDate: startDate,
                        endDate: endDate,
                        onReserve: () => {}, // 예약 함수 설정
                        loading: false, // 로딩 상태
                        error: null // 에러 상태
                    }
                });

            } catch (error) {
                console.error('데이터 가져오기 오류', error);
            }
        };
        fetchData();
    }, [choiceDTO, setChoicedata]); // 의존성 배열에 choiceDTO 추가

    return (
        <>
        </>
    );
};

export default ChoiceData;
