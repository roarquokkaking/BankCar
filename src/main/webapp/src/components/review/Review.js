import React, { useContext } from 'react';
import UserReview from './UserReview';
import UserReviewInput from './UserReviewInput';

const Review = () => {
    // const {onAddReview} = useContext(ReviewContext)
    return (
        <div>
            <UserReview />
            {/* <UserReviewInput/> */}
        </div>
    );
};

export default Review;