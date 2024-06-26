import React, { useState } from 'react';
import UserReviewItem from './UserReviewItem';
import './ReviewCSS.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const UserReview = ({ rating, title, comment, id, name, reviews }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
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