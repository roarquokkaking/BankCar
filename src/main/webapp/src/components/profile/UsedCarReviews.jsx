import React from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ComponentHeader from './ComponentsHeader';

const UsedCarReviews = () => {
    const navigate = useNavigate();
    return (
      <div>
        <ComponentHeader text={"사용 완료된 자동차 리뷰"} />
      </div>
    );
};

export default UsedCarReviews;