import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import axios from "axios";

const ChoiceData = () => {
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(choiceDTO);
                const response = await axios.get("http://localhost:8080/choice/choicedata", {
                    params: {
                        carId: choiceDTO.carId
                    }
                });
                // 서버에서 가져온 데이터로 필요한 작업 수행
                console.log(response.data);
            } catch (error) {
                console.error('데이터 가져오기 오류', error);
            }
        };

        fetchData();
    }, [choiceDTO]); // 의존성 배열에 choiceDTO 추가

    return (
        <>
        </>
    );
};

export default ChoiceData;
