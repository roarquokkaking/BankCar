import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/locale";
import styles from './DateTimeSelector.module.css';
import { insertCarServiceApi } from "../../register/api/CarApiService";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const DateTimePicker = ({ carId }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [dateRangeDiv, setDateRangeDiv] = useState("");
    const [startTimeDiv, setStartTimeDiv] = useState("");
    const [endTimeDiv, setEndTimeDiv] = useState("");
    const navigate = useNavigate();

    const formatDateString = (date) => {
        if (!date) return "";
        const offset = date.getTimezoneOffset() * 60000; // getTimezoneOffset()은 분 단위로, 따라서 밀리초로 변환하기 위해 60000을 곱합니다.
        const localDate = new Date(date.getTime() - offset);
        // toISOString 대신에 toLocaleDateString 사용
        return localDate.toISOString().split('T')[0];
    };

    const formatTimeString = (time) => {
        if (!time) return "";
        const hours = String(time.getHours()).padStart(2, '0');
        const minutes = String(time.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const [serviceDTO, setServiceDTO] = useState({
        startDate,
        endDate,
        startTime,
        endTime
    });

    useEffect(() => {
        if (startDate) {
            onInput(formatDateString(startDate), 'startDate');
        }
    }, [startDate]);

    useEffect(() => {
        if (endDate) {
            onInput(formatDateString(endDate), 'endDate');
        }
    }, [endDate]);

    const onInput = (value, name) => {
        setServiceDTO(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitCar = () => {
        setEndTimeDiv("");
        setDateRangeDiv("");
        setStartTimeDiv("");
        console.log(serviceDTO)

        if (startDate === null) {
            setDateRangeDiv("서비스 날짜를 설정해 주세요.");
            return;
        } else if (startTime === null) {
            setStartTimeDiv("대여 시작 시간을 설정해 주세요.");
            return;
        } else if (endTime === null) {
            setEndTimeDiv("반납 시간을 설정해 주세요.");
            return;
        }

        // insertCarServiceApi(serviceDTO, carId)
        insertCarServiceApi(serviceDTO, carId)
            .then(response => alert("등록 되었습니다."))
            .catch(error => console.log(error));

        navigate(-1)

    };

    return (
        <div>
            <div className="input-group">
                <div className="input-box">
                    <h5>대여 기간</h5>
                    <DatePicker
                        placeholderText="대여 기간"
                        dateFormat="yyyy년 MM월 dd일"
                        minDate={new Date()}
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        locale={ko}
                    />
                    <div>{dateRangeDiv}</div>
                    <br />
                    <h5>{startDate && formatDateString(startDate)} / 대여 시작 시간</h5>
                    <DatePicker
                        placeholderText="대여 시작 가능 시간"
                        selected={startTime}
                        onChange={(time) => {
                            setStartTime(time);
                            onInput(formatTimeString(time), 'startTime');
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="시간"
                        dateFormat="HH:mm"
                        withPortal
                        locale={ko}
                    />
                    <div>{startTimeDiv}</div>
                    <br />
                    <h5>{endDate && formatDateString(endDate)} / 반납 시간</h5>
                    <DatePicker
                        placeholderText="대여 반납 가능 시간"
                        selected={endTime}
                        onChange={(time) => {
                            setEndTime(time);
                            onInput(formatTimeString(time), 'endTime');
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="시간"
                        dateFormat="HH:mm"
                        withPortal
                        locale={ko}
                    />
                    <div>{endTimeDiv}</div>
                    <button className={styles.serviceButton} onClick={onSubmitCar}>BankCar에 올리기</button>
                </div>
                carId: {carId},<br />
                {startTime && formatTimeString(startTime)},<br />
                {startDate && formatDateString(startDate)},<br />
                {endTime && formatTimeString(endTime)},<br />
                {endDate && formatDateString(endDate)}<br />
            </div>
        </div>
    );
};

export default DateTimePicker;
