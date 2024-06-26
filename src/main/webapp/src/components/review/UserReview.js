import React, { useState } from 'react';
import UserReviewItem from './UserReviewItem';
import './ReviewCSS.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const UserReview = ({ rating, title, comment, id, name, reviews }) => {
  
  return (
    <div className='review-container'>
      {/*<h2 style={{textAlign:"-webkit-left", paddingLeft: "20px" }}>User Reviews</h2>*/}
      {reviews.length === 0 ? (
          <p style={{ textAlign: "center", color: "#999", padding: "20px" }}>아직 리뷰가 없습니다.</p>
      ) : (
          <Carousel responsive={responsive}>
            {reviews.map((review, index) => (
                <UserReviewItem key={index} review={review} />
            ))}
          </Carousel>
      )}
    </div>
  );
};

export default UserReview;