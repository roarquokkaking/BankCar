import React, {useEffect, useState} from 'react';

import MyRating from "./MyRating";
import Details from "./Details";
import FooterMenu from "../FooterMenu";
import axios from "axios";
import {useParams} from "react-router-dom";

const UseReview = (effect, deps) => {

    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    // const [image, setImage] = useState(null);
    const {user_id} = useParams()
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [detailsDTO, setDetailsDTO] = useState({
        car_model:"",
        images:[],
        title:"",
        comment:"",
        rating:null,
    });
console.log(user_id)

    // const handleImageChange = (e) => {
    //     setImage(e.target.files[0]);
    // };



    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setComment(e.target.value);
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/review/getReviewBase/${user_id}`);
                setDetailsDTO(response.data); // 응답 구조에 따라 조정이 필요할 수 있습니다.
                console.log(response.data);
            } catch (error) {
                console.error('상세 정보를 불러오는데 실패했습니다.', error);
            }
        };
        // fetchImages();
        fetchDetails();
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % detailsDTO.images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [user_id],[detailsDTO.images.length]);

    const handleSubmit = () => {

    }

    return (
        <div>
            <Details currentImageIndex={currentImageIndex} detailsDTO={detailsDTO} />
            <MyRating title={title} comment={comment} handleTitleChange={handleTitleChange} handleContentChange={handleContentChange} handleSubmit={handleSubmit} />
            <FooterMenu />
        </div>
    );
};

export default UseReview;