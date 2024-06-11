import React from 'react';

const ChoiceFooter = ({ price, startTime, endTime, onReserve }) => {
    return (
        <div className="choice-footer">
            <div className="price-time">
                <span className="price">{price}원</span>
                <span className="starttime">{startTime}</span>
                <span className='endtime'>{endTime}</span>
            </div>
            <div className="button-container">
                <span className="button-text" onClick={onReserve}>예약 하기</span>
            </div>
        </div>
    );
};

export default ChoiceFooter;