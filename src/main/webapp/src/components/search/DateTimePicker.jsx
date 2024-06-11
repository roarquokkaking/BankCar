import React, { useEffect, useRef, useState  } from 'react';
import DatePicker from 'react-datepicker';
import "../../CSS/SearchCSS.css";
import 'react-datepicker/dist/react-datepicker.css';

const DateTimePicker = ({ searchDTO, setSearchDTO }) => {
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [dateRangeDiv, setDateRangeDiv] = useState('')
    const [startTimeDiv, setStartTimeDiv] = useState('')
    const [endTimeDiv, setEndTimeDiv] = useState('')

    const addDaysAndFormat = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);

        return newDate.toISOString().split('T')[0];
    };

    const addHoursAndFormat = (time) => {
        const newTime = new Date(time);
        newTime.setHours(newTime.getHours());
    
        const hoursFormatted = String(newTime.getHours()).padStart(2, '0');
        const minutes = String(newTime.getMinutes()).padStart(2, '0');
    
        return `${hoursFormatted}:${minutes}`;
    };

    useEffect(() => {
        if (startDate) {
            onInput(addDaysAndFormat(startDate), 'startDate');
        }
    }, [startDate]);

    useEffect(() => {
        if (endDate) {
            onInput(addDaysAndFormat(endDate), 'endDate');
        }
    }, [endDate]);


    const onInput = (value, name) => {
        setSearchDTO({
          ...searchDTO,
          [name]:value
        });
        console.log(searchDTO);
    };    

    return (
        <div>
            <div className="input-group">
                <div className="input-box">
                    <DatePicker
                        placeholderText="대여 기간"
                        // showIcon
                        dateFormat="yyyy년 MM월 dd일"
                        minDate={new Date()}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setStartDate(update[0]);
                            setEndDate(update[1]);
                        }}
                        withPortal
                    />
                    <div>{dateRangeDiv}</div>
                    <br/>
                    <DatePicker
                        name="startTime"
                        placeholderText="대여 가능 시간"
                        selected={startTime}
                        onChange={(time) => {
                            setStartTime(time)
                            onInput(addHoursAndFormat(time),'startTime');
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        withPortal
                    />
                    <div>{startTimeDiv}</div>
                    <br/>
                    <DatePicker
                        placeholderText="반납 가능 시간"
                        selected={endTime}
                        onChange={(time) => {
                            setEndTime(time)
                            onInput(addHoursAndFormat(time),'endTime');
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        withPortal
                    />
                    <div>{endTimeDiv}</div>
                </div>
            </div>
        </div>
    );
};

export default DateTimePicker;