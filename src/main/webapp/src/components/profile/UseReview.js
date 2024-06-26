import React, { useEffect, useState } from 'react';
import MyRating from "./MyRating";
import Details from "./Details";
import FooterMenu from "../FooterMenu";
import axios from "axios";
import { useParams } from "react-router-dom";
import {getTableSortLabelUtilityClass} from "@mui/material";
import ComponentHeader from "./ComponentsHeader";

const UseReview = () => {
    const { userId, carId,booking_id } = useParams();

    console.log(booking_id + "bookingId - ")
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [detailsDTO, setDetailsDTO] = useState({
        carId: carId,
        userId: userId,
        images: [],
        ratingCount: {},
        averRating: "",
        carModel: "",
        rating: 0,
        title: "",
        comment: "",
        startDate: "",
        endDate: "",
    });
console.log(carId)
    console.log(detailsDTO)

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setComment(e.target.value);
    };

    const getAverage = (newRating) => {
        const newTotal = total + newRating;
        const newCount = count + 1;
        setTotal(newTotal);
        setCount(newCount);
        return newTotal / newCount;
    };


    useEffect(() => {
        console.log(userId ,carId,booking_id)
        if (userId && carId) {
            axios.get(`https://dongwoossltest.shop/api/review/getReviewBase/${booking_id}/${carId}/${userId}`)
                .then((response) => {
                    const data = response.data;
                    const ratingCount = Array.isArray(data.ratingCount) ? data.ratingCount : [0, 0, 0, 0, 0];

                    setDetailsDTO(data);
                    setRating(data.averageRating);
                    setRatings(ratingCount);
                    setTotal(Array.from(ratingCount.entries()).reduce((acc, [key, value]) => acc + key * value, 0));
                    setCount(Array.from(ratingCount.values()).reduce((acc, value) => acc + value, 0));
                })
                .catch((error) => {
                    console.error('상세 정보를 불러오는데 실패했습니다.', error);
                });
        } else {
            console.error('user_id 또는 car_id가 정의되지 않았습니다.');
        }
    }, [userId, carId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % detailsDTO.images.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [detailsDTO.images.length]);


    const submitRating =  (ratingValue) => {
        setRating(ratingValue);
        // try {
        //     console.log(rating)
        //
        //     const response = await axios.post('http://localhost:8080/review/saveRating', null, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         params: {
        //             rating: ratingValue,
        //             user_id: user_id,
        //             car_id: car_id
        //         }
        //     });
        //     console.log('평점을 저장하는데 성공했습니다.', response.data);
        // } catch (error) {
        //     console.error('평점을 저장하는데 실패했습니다.', error);
        //     if (error.response) {
        //         console.error('응답 데이터:', error.response.data);
        //         console.error('응답 상태:', error.response.status);
        //         console.error('응답 헤더:', error.response.headers);
        //     } else if (error.request) {
        //         console.error('요청 데이터:', error.request);
        //     } else {
        //         console.error('에러 메시지:', error.message);
        //     }
        // }
    };

    const handleSubmit = async () => {



        try {
            console.log(userId+"ds,vdvnkad;vc")
            const reviewDTO = {
                userId: userId,
                carId: carId,
                title: title,
                comment: comment,
                rating: rating
            };

            const response = await axios.post('https://dongwoossltest.shop/api/review/writeReview', reviewDTO, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Review submitted:', response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };
    console.log(rating)
    return (
        <div>
            <ComponentHeader text={"리뷰 작성하기 "} />
            <Details currentImageIndex={currentImageIndex} detailsDTO={detailsDTO} />
            <MyRating
                title={title}
                comment={comment}
                rating={rating}
                hover={hover}
                ratings={ratings}
                count={count}
                handleTitleChange={handleTitleChange}
                handleContentChange={handleContentChange}
                handleSubmit={handleSubmit}
                submitRating={submitRating}
                setRating={setRating}
                setHover={setHover}
            />
            <FooterMenu />
        </div>
    );
};

export default UseReview;
