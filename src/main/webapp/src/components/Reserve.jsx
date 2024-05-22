import React, { forwardRef, useState } from 'react'; 
import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
// import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

import '../CSS/ReserveCSS.css';

const Reserve = () => {
    // 달력
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
          {value}
        </button>
      ));

    const [activeTab, setActiveTab] = useState('Stays');

    return (
        <div>
            <div className="header">
                <div className={`tab ${activeTab === 'Stays' ? 'active' : ''}`} onClick={() => setActiveTab('Stays')}>
                    Stays
                </div>
                <div className={`tab ${activeTab === 'Experiences' ? 'active' : ''}`} onClick={() => setActiveTab('Experiences')}>
                    Experiences
                </div>
            </div>
            <div className="search-container">
                <h2>오데가노?</h2>
                <div className="search-bar">
                    <FaSearchLocation className='FaSearchLocation' size='25' />
                    <input type="text" placeholder="Search destinations" />
                </div>
                <div className="input-group">
                    <div className="input-box">
                        {/* <input type="text" placeholder="When" readOnly /> */}
                        {/* <DatePicker
                            dateFormat="yyyy.MM.dd" // 날짜 형태
                            shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                            minDate={new Date()} // minDate 오늘 날짜
                            startDate={startDate}
                            endDate={endDate}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                        /> */}
                        <DatePicker
                            dateFormat="yyyy년 MM월 dd일"
                            minDate={new Date()}
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}
                            // locale={ko}
                        /><FaRegCalendarAlt />
                        <span>Choose</span>
                    </div>
                </div>
                <div className="input-group">
                    <div className="input-box">
                        <input type="text" placeholder="Type" readOnly />
                        <span>Choose</span>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="clear-button">Clear all</div>
                <div className="search-button">Search</div>
            </div>
        </div>
    );
};

export default Reserve;
