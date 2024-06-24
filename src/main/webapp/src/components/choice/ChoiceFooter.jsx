import React from 'react';

const ChoiceFooter = ({ price, startTime, endTime ,startDate, endDate, onReserve, loading, error, choicedata }) => {
    const formatPrice = (value) => {
        return new Intl.NumberFormat("ko-KR").format(value);
    };

    return (
        <div className="choice-footer">
            <div className="price-time">
                <span className="price">{formatPrice(price)}원</span>
                <span className="starttime">{startDate} {startTime}</span>
                <span className='endtime'>{endDate} {endTime}</span>
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