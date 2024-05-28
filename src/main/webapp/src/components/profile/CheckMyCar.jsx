import React from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import ComponentHeader from './ComponentsHeader';

const CheckMyCar = () => {
    const navigate = useNavigate();
    return (
      <div>
            <ComponentHeader text={"등록된 나의 자동차" } />
        
      </div>
    );
};

export default CheckMyCar;