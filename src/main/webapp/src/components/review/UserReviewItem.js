import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
import './ReviewCSS.css'

const UserReviewItem =  ({ review }) => {

  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleNext = () =>{
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  // }

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  // }
  // if(currentIndex>reviews.length-3){
  //   console.log(currentIndex)
  //   setCurrentIndex(0)
  // }
    return (
      <div className="flex-none w-1/3 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center">
        <span className="flex">
          {[...Array(5)].map((star, starIndex) => (
            <FaStar
              key={starIndex}
              size="14"
              color={review.rating > starIndex ? 'red' : 'grey'}
            />
          ))}
        </span>
      </div>
      <p className="text-lg font-bold mt-2">{review.username}</p>
      <p className="text-gray-500 review-text">{review.comment}</p>
      <small className="text-gray-400">{review.date}</small>
    </div>
    );
  };

export default UserReviewItem;