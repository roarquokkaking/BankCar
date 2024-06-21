import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CarouselCard from '../CarouselCard';
import axios from 'axios';
import { Locations as cardLocations } from '../../data/mock-data';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LocationCards = () => {
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [cards, setCards] = useState('');
    const [loading, setLoading] = useState(false);
    const newLocations = cardLocations();
    const user_id = useSelector(state => state.Login.id);
    const [isHeartClicked, setIsHeartClicked] = useState([]); // 여러 하트 상태를 담는 배열
    const [selectedHeartId, setSelectedHeartId] = useState(null); // 선택된 하트 ID 추가
    const [car_id, setCarId] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const searchParams = new URLSearchParams(location.search);
                const searchDTO = {
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

                if (searchDTO.startDate && searchDTO.endDate && searchDTO.startTime && searchDTO.endTime) {
                    const response = await axios.get("https://dongwoossltest.shop/api/searching/searchList", null, { params: searchDTO });
                    setSearchData(response.data);
                } else {
                    setSearchData([]);
                }
            } catch (error) {
                console.error('검색 오류', error);
            }
        };

        fetchLocations();
    }, [location.search]);

    const handleHeartClick = async (car_id, index, id) => { // car_id 매개변수 추가
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:8080/WishList/wish/toggle/${user_id}/${car_id}`);
            setCards(response.data);

            // 하트 클릭 상태 업데이트
            const newIsHeartClicked = Array(newLocations.length).fill(false); // 모든 하트를 false로 초기화
            newIsHeartClicked[index] = true; // 클릭된 하트만 true로 설정
            setIsHeartClicked(newIsHeartClicked);
            setSelectedHeartId(id); // 선택된 하트 ID 설정
        } catch (error) {
            console.error('데이터 가져오기 오류', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!newLocations.length) {
        return <div>자료가 없습니다.</div>;
    }

    return (
        <Box sx={{ mx: 2 }}>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {newLocations.map((location, index) => (
                    <Grid key={location.id} item xs={12} sm={4} md={4} lg={3}>
                        <CarouselCard
                            location={location}
                            isHeartClicked={isHeartClicked[index]}
                            onHeartClick={() => handleHeartClick(location.car_id, index, location.id)} // car_id 전달
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LocationCards;
