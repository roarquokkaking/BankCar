import React from 'react';
import UserReviewItem from './UserReviewItem';
import './ReviewCSS.css'

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
        }
      ];

    return (
        <div className='review-container'>
            <h2>User Reviews</h2>
            {reviews.map(review => (
                <UserReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
};

export default UserReview;