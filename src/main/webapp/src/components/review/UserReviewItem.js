import React from 'react';
import { FaStar } from 'react-icons/fa';
import './ReviewCSS.css'

const UserReviewItem =  ({ review }) => {
    return (
      <div className='review'>
        <h4>{review.username}</h4>
        <div className='rating'>
          <span>{[...Array(5)].map((star, index) => {
                    return (
                    <FaStar
                        key={index}
                        size="14"
                        color={review.rating > index ? 'red' : 'grey'}
                    />
                    );
                })}
            </span>
        </div>
        <p className='review-text'>{review.comment}</p>
        <small>{review.date}</small>
      </div>
    );
  };

export default UserReviewItem;