import React from 'react';
import './css/Content.css';
const DriverContent = () => {
    return (
        <div className="Content">
        <p className="description">
          모바일운전면허 확인서비스 등록을 위해<br />
          실물 운전면허증을 준비해주세요.<br />
          다음화면에서 촬영을 진행합니다.
        </p>
        <div className="license-image">
          <img src="/image/driver.png" alt="자동차 운전면허증" />
        </div>
        <p className="instruction">
          어두운 배경에서 신분증을 촬영하세요.<br />
          약간 기울어서 촬영하면 빛반사를 최소화 할 수 있어요.
        </p>
      </div>
    );
};

export default DriverContent;