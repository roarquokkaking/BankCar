import React from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ComponentHeader from './ComponentsHeader';

const ReservedCars = () => {
    const navigate = useNavigate();
    return (
      <div>
        <ComponentHeader text={"내가 예약한 자동차"} />
      </div>
    );
};

export default ReservedCars;