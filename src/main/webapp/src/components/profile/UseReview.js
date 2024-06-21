import React, { useEffect, useState } from 'react';
import MyRating from "./MyRating";
import Details from "./Details";
import FooterMenu from "../FooterMenu";
import axios from "axios";
import { useParams } from "react-router-dom";

const UseReview = ({ userId, carId }) => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const { user_id, car_id } = useParams();

    const[reviewDTO,  setReviewDTO]=useState('')

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [detailsDTO, setDetailsDTO] = useState({
        images: [],
        car_model: "",
        title: "",
        comment: "",
        rating: null,
        car_id: car_id,
        user_id: user_id
    });
    console.log(detailsDTO)
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

    const handleRating = async (ratingValue) => {
        const newRatings = [...ratings];
        newRatings[ratingValue - 1] += 1;
        setRatings(newRatings);
        const newAverageRating = getAverage(ratingValue);
        setRating(newAverageRating);

        // 변경된 부분
        try {
            await axios.post('http://localhost:8080/review/saveRating', {
                user_id: user_id,
                title: title,
                comment: comment,
                rating: ratingValue
            });
        } catch (error) {
            console.error('평점을 저장하는데 실패했습니다.', error);
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`https://dongwoossltest.shop/api/review/getReviewBase/${user_id}`);
                setDetailsDTO(response.data);
            } catch (error) {
                console.error('상세 정보를 불러오는데 실패했습니다.', error);
            }
        };

        fetchDetails();
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % detailsDTO.images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [user_id, detailsDTO.images.length]);

    const handleSubmit = () => {
        console.log('제목:', title);
        console.log('내용:', comment);
        console.log('평점:', rating);
    };
    const submitRating = (ratingValue) => {
        axios.post('http://localhost:8080/review/memo', null, {
            params: {
                user_id: user_id,
                car_id: car_id
            }
        }).catch((error) => {
            console.error('평점을 저장하는데 실패했습니다.', error);
        });
    };
console.log(rating)
    return (
        <div>
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
                handleRating={handleRating}
                handleSubmit={handleSubmit}
                setHover={setHover}
                submitRating={submitRating}
            />
            <FooterMenu />
        </div>
    );
};

export default UseReview;
