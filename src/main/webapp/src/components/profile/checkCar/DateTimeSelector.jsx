import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/locale";
import { useNavigate } from 'react-router-dom';
import { insertCarServiceApi } from "../../api/CarApiService";
import {
    Box,
    Button,
    Container,
    Grid,
    TextField,
    Typography,
    Alert
} from '@mui/material';
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const DateTimeSelector = ({ carId }) => {
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
        console.log(serviceDTO);

        if (startDate === null) {
            setDateRangeDiv("서비스 날짜를 설정해 주세요.");
            return;
        } else if (startTime === null) {
            setStartTimeDiv("서비스 시작 시간을 설정해 주세요.");
            return;
        } else if (endTime === null) {
            setEndTimeDiv("서비스 반납 시간을 설정해 주세요.");
            return;
        }

        insertCarServiceApi(serviceDTO, carId)
            .then(response => Swal.fire({
                icon: 'success',
                title: "<div style='color:#000000;font-size:15px'>등록 되었습니다.</div>",
                }))
            .catch(error => console.log(error));

        navigate(-1);
    };

    return (
        <Container sx={{ my: 4, p: 3, backgroundColor: '#f8faff', borderRadius: 2, boxShadow: 3 }}>
            <Box sx={{ my: 4, p: 3, backgroundColor: '#ffffff', borderRadius: 2, boxShadow: 3 }}>
                <Typography variant="h2" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
                    서비스 예약
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#1976d2' }}>대여 기간</Typography>
                        <DatePicker
                            placeholderText="서비스 기간"
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
                            // customInput={<TextField fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} />}
                        />
                        {dateRangeDiv && <Alert severity="error" sx={{ mt: 2 }}>{dateRangeDiv}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#1976d2' }}>서비스 대여 시작 시간 {startDate && formatDateString(startDate)}</Typography>
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
                            //customInput={<TextField fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} />}
                        />
                        {startTimeDiv && <Alert severity="error" sx={{ mt: 2 }}>{startTimeDiv}</Alert>}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" sx={{ color: '#1976d2' }}>서비스 반납 시간 {endDate && formatDateString(endDate)}</Typography>
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
                            //customInput={<TextField fullWidth variant="outlined" sx={{ backgroundColor: '#fff', borderRadius: 1 }} />}
                        />
                        {endTimeDiv && <Alert severity="error" sx={{ mt: 2 }}>{endTimeDiv}</Alert>}
                    </Grid>
                </Grid>
            </Box>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={onSubmitCar} sx={{ mt: 3, py: 1.5, fontSize: '1rem' }}>
                    BankCar에 올리기
                </Button>
            </Grid>
        </Container>
    );
};

export default DateTimeSelector
