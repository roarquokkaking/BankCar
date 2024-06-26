import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import 'react-multi-carousel/lib/styles.css';
import './ReviewCSS.css'

const UserReviewItem =  ({ review }) => {


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
            <p className="text-lg font-bold mt-2">{review.name}</p>
            <h3 className='review-title'>{review.title}</h3>
            <p className="text-gray-500 review-text">{review.comment}</p>
        </div>
    );
};

export default UserReviewItem;