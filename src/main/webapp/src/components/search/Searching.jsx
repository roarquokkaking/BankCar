import React, { useEffect, useState } from 'react'; 
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

import '../../CSS/SearchCSS.css';
import KakaoMap from './KakaoMap';
import DateTimePicker from './DateTimePicker';
import PriceSelect from './PriceSelect';

const Searching = () => {
    // 달력
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [reset, setReset] = useState(false)
    const [dateRangeDiv, setDateRangeDiv] = useState('')
    const [startTimeDiv, setStartTimeDiv] = useState('')
    const [endTimeDiv, setEndTimeDiv] = useState('')

    const [searchDTO, setSearchDTO] = useState({
        startDate:'',
        endDate:'',
        startTime:'',
        endTime:'',
        jibunAddress: '',
        roadAddress: '',
        x: '',
        y: '',
        minPrice:1000,
        maxPrice:100000
    })

    const onReset = (e)=>{
        e.preventDefault()
        setReset(true);
        setSearchDTO({
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            jibunAddress: '',
            roadAddress: '',
            x: '',
            y: '',
            minPrice:1000,
            maxPrice:100000
        });
        setValidationMessages({
            dateRange: '',
            startTime: '',
            endTime: ''
        });
    }

    const [validationMessages, setValidationMessages] = useState({
        date: '',
        starttime: '',
        endtime:''
    });

    const navigate = useNavigate();
    const createURLWithParams = (params) => {
        const urlParams = new URLSearchParams(params).toString();
        return `/?${urlParams}`;
    };

    const onSearch = () => {
        let isValid = true;
        let newValidationMessages = { date: '', starttime: '', endtime: '' };

        if (searchDTO.startDate === '' || searchDTO.endDate === '') {
            newValidationMessages.date = '기간을 입력하세요';
            isValid = false;
        }
        else if (searchDTO.startTime === '') {
            newValidationMessages.starttime = '시간을 입력하세요';
            isValid = false;
        }
        else if (searchDTO.endTime === '') {
            newValidationMessages.endtime = '시간을 입력하세요';
            isValid = false;
        }

        setValidationMessages(newValidationMessages);

        if (isValid) {
            const url = createURLWithParams(searchDTO);
            navigate(url);
        }
    };

    return (
        <div>
            <div className="search-header"></div>
            <div className="search-container">
                <KakaoMap searchDTO={searchDTO} setSearchDTO={setSearchDTO} reset={reset} setReset={setReset} />
                <br/>
                <DateTimePicker searchDTO={searchDTO} setSearchDTO={setSearchDTO} validationMessages={validationMessages} reset={reset} setReset={setReset}/>
                <br/>
                <PriceSelect searchDTO={searchDTO} setSearchDTO={setSearchDTO} fixedMinPrice={1000} fixedMaxPrice={100000} priceGap={10} reset={reset} setReset={setReset}/>
            </div>
            <div className="search-footer">
                <div className="clear-button" onClick={onReset}>Clear all</div>
                <div className="search-button" onClick={onSearch}>Search</div>
            </div>
        </div>
    );
};

export default Searching;
