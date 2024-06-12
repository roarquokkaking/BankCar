import React from 'react';

const ChoiceFooter = ({ price, startTime, endTime, onReserve, loading, error }) => {
    return (
        <div className="choice-footer">
            <div className="price-time">
                <span className="price">{price}원</span>
                <span className="starttime">{startTime}</span>
                <span className='endtime'>{endTime}</span>
            </div>
            {error && <div className="error-message">{error}</div>}
            <div className="button-container">
                <span className="button-text" onClick={onReserve} disabled={loading}>
                    {loading ? '로딩 중...' : '결제 하기'}
                </span>
            </div>
        </div>
    );
};

export default ChoiceFooter;