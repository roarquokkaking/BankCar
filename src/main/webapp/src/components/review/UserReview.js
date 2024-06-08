import React, { useState } from 'react';
import UserReviewItem from './UserReviewItem';
import './ReviewCSS.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const UserReview = () => {

  const reviews = [
    {
      id: 1,
      username: "User1",
      rating: 5,
      comment: "hi!",
      date: "2024-05-16"
    },
    {
      id: 2,
      username: "User2",
      rating: 4,
      comment: "hi",
      date: "2024-05-15"
    },
    {
      id: 3,
      username: "User3",
      rating: 3,
      comment: "hi",
      date: "2024-05-14"
    },
    {
      id: 4,
      username: "User4",
      rating: 5,
      comment: "hi!",
      date: "2024-05-16"
    },
    {
      id: 5,
      username: "User5",
      rating: 4,
      comment: "hi",
      date: "2024-05-15"
    },
    {
      id: 6,
      username: "User6",
      rating: 3,
      comment: "hi",
      date: "2024-05-14"
    }
  ];

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
      <h2 style={{textAlign:"-webkit-left", paddingLeft: "20px" }}>User Reviews</h2>
      <Carousel responsive={responsive}>
        {reviews.map(review => (
          <UserReviewItem key={review.id} review={review} />
        ))}
      </Carousel>
    </div>
  );
};

export default UserReview;