import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CarouselCard from './CarouselCard';
import axios from 'axios';
import { Locations as cardLocations } from '../data/mock-data';
import { useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";
import { baseURL } from '../data/UrlTransform';
import Swal from "sweetalert2";
import "../CSS/LocationCards.css"

const LocationCards = () => {
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [cards, setCards] = useState('');
    const [loading, setLoading] = useState(false);
    const newLocations = cardLocations();
    const searchLocations = cardLocations(searchData);
    const user_id = useSelector(state => state.Login.id)
    const [isHeartClicked, setIsHeartClicked] = useState([]);

    const [searchDTO, setSearchDTO] = useState({
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        jibunAddress: '',
        roadAddress: '',
        x: '',
        y: '',
        minPrice: '',
        maxPrice: ''
    });

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // URL 파라미터에서 검색 조건 추출
                const searchParams = new URLSearchParams(location.search);
                const updatedSearchDTO = {
                    startDate: searchParams.get('startDate') || '',
                    endDate: searchParams.get('endDate') || '',
                    startTime: searchParams.get('startTime') || '',
                    endTime: searchParams.get('endTime') || '',
                    jibunAddress: searchParams.get('jibunAddress') || '',
                    roadAddress: searchParams.get('roadAddress') || '',
                    x: searchParams.get('x') || '',
                    y: searchParams.get('y') || '',
                    minPrice: searchParams.get('minPrice') || '',
                    maxPrice: searchParams.get('maxPrice') || ''
                };
                setSearchDTO(updatedSearchDTO);

                if (updatedSearchDTO.startDate && updatedSearchDTO.endDate && updatedSearchDTO.startTime && updatedSearchDTO.endTime) {
                    const response = await axios.get(`${baseURL}/searching/searchList`, { params: updatedSearchDTO });
                    setSearchData(response.data);
                    if (response.data.length === 0){
                        Swal.fire({
                            icon: "info",
                            title: "찾으시는 조건이 없습니다",
                            text: "다시 검색해 주세요!",
                            customClass: {
                                container: 'my-swal-container-class',
                                title: 'my-swal-title-class',
                                content: 'my-swal-content-class',
                                confirmButton: 'my-swal-confirm-button-class',
                                body: 'my-swal-body'
                            }
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // "/" 경로로 이동
                                window.location.href = '/';
                            }
                        });
                    }
                } else {
                    setSearchData([]); // 검색 조건이 없으면 빈 배열 설정
                }
            } catch (error) {
                console.error('검색 오류', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLocations(); // 컴포넌트가 처음 마운트될 때 한 번 호출

        // 검색 데이터가 변경될 때마다 다시 검색 요청
    }, [location.search]);

    const handleHeartClick = async (carId,index) => {
        setLoading(true);
        try {
            const response =
                await axios.post(`http://localhost:8080/WishList/wish/toggle/${user_id}/${carId}`);//${carId}
            setCards(response.data);

            // 하트 클릭 상태 업데이트
            const newIsHeartClicked = [...isHeartClicked];
            newIsHeartClicked[index] = !newIsHeartClicked[index];
            setIsHeartClicked(newIsHeartClicked);
        } catch (error) {
            console.error('데이터 가져오기 오류', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ mx: 2 }}>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {newLocations.map((location, index) => {
                    // 검색 결과 데이터가 있는 경우와 없는 경우를 확인하여 렌더링 여부 결정
                    if (searchData.length > 0 && !searchData.some(data => data === location.car_id)) {
                        return null; // searchData에 해당 car_id가 없으면 렌더링하지 않음
                    }
                    return (
                        <Grid key={location.id} item xs={12} sm={4} md={4} lg={3}>
                            <CarouselCard
                                searchDTO={searchDTO}
                                location={location}
                                isHeartClicked={isHeartClicked[index]}
                                onHeartClick={() => handleHeartClick(location.car_id, index)}
                            />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

export default LocationCards;
