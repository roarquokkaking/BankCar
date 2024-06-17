import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CarouselCard from '../CarouselCard';
import axios from 'axios';
import { Locations as cardLocations } from '../../data/mock-data';
import { useLocation } from 'react-router-dom';

const LocationCards = () => {

    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [cards, setCards] = useState('');
    const [loading, setLoading] = useState(false);
    const newLocations = cardLocations();


    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const searchDTO = {
    //         startDate: searchParams.get('startDate') || '',
    //         endDate: searchParams.get('endDate') || '',
    //         startTime: searchParams.get('startTime') || '',
    //         endTime: searchParams.get('endTime') || '',
    //         jibunAddress: searchParams.get('jibunAddress') || '',
    //         roadAddress: searchParams.get('roadAddress') || '',
    //         x: searchParams.get('x') || '',
    //         y: searchParams.get('y') || '',
    //         minPrice: searchParams.get('minPrice') || '',
    //         maxPrice: searchParams.get('maxPrice') || ''
    //     };

    //     axios.post("http://localhost:8080/searching/searchList", null, { params: searchDTO })
    //         .then(res => {
    //             setSearchData(res.data);
    //         })
    //         .catch(error => console.log(error));
    // }, [location.search, searchData]);

    // useEffect(() => {
    //     const fetchLocations = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/home');
    //             setCards(response.data);
    //         } catch (error) {
    //             console.error('오류', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchLocations();
    // }, []);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // URL 파라미터에서 검색 조건 추출
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

                // 검색 조건이 있는 경우에만 서버에 POST 요청
                if (searchDTO.startDate && searchDTO.endDate && searchDTO.startTime && searchDTO.endTime) {
                    const response = await axios.get("https://dongwoossltest.shop/api/searching/searchList", null, { params: searchDTO });
                    setSearchData(response.data);
                } else {
                    setSearchData([]); // 검색 조건이 없으면 빈 배열 설정
                }
            } catch (error) {
                console.error('검색 오류', error);
            }
        };

        fetchLocations(); // 컴포넌트가 처음 마운트될 때 한 번 호출

        // 검색 데이터가 변경될 때마다 다시 검색 요청
    }, [location.search]);

    // useEffect(() => {
    //     const fetchLocations = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8080/home');
    //             setCards(response.data);
    //         } catch (error) {
    //             console.error('오류', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchLocations(); // 컴포넌트가 처음 마운트될 때 한 번 호출

    // }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!newLocations.length) {
        return <div>자료가 없습니다.</div>;
    }

    return (
        <Box sx={{ mx: 2 }}>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {newLocations.map((location) => (
                    <Grid key={location.id} item xs={12} sm={4} md={4} lg={3}>
                        <CarouselCard location={location} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LocationCards;
