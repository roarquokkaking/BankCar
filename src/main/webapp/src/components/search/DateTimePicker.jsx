import React from 'react';
import DatePicker from 'react-datepicker';

const DateTimePicker = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    dateRangeDiv,
    startTimeDiv,
    endTimeDiv,
    addHoursAndFormat,
    onInput
}) => {
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