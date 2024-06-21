import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CarouselCard from '../CarouselCard';
import axios from 'axios';
import { Locations as cardLocations } from '../../data/mock-data';
import { useLocation } from 'react-router-dom';
import {useSelector} from "react-redux";

const LocationCards = () => {
    const location = useLocation();
    const [searchData, setSearchData] = useState([]);
    const [cards, setCards] = useState('');
    const [loading, setLoading] = useState(false);
    const newLocations = cardLocations();
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
                    const response = await axios.get("https://dongwoossltest.shop/api/searching/searchList", { params: updatedSearchDTO });
                    setSearchData(response.data);
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
                await axios.post(`https://dongwoossltest.shop/api/WishList/wish/toggle/${user_id}/${carId}`);//${carId}
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



    return (
        <Box sx={{ mx: 2 }}>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {newLocations.map((location, index) => (
                    <Grid key={location.id} item xs={12} sm={4} md={4} lg={3}>
                        <CarouselCard location={location}
                                      isHeartClicked={isHeartClicked[index]}
                                      onHeartClick={() => handleHeartClick(index)} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default LocationCards;
