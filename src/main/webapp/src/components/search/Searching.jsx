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
        minPrice:'',
        maxPrice:''
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
            minPrice:'',
            maxPrice:''
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
            axios.post("http://localhost:8080/searching/searchList", null, { params: searchDTO })
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => console.log(error));
        }
    };

    return (
        <div>
            <div className="search-header"></div>
            <div className="search-container">
                <h2>오데가노?</h2>
                <KakaoMap searchDTO={searchDTO} setSearchDTO={setSearchDTO} />
                <br/>
                <DateTimePicker searchDTO={searchDTO} setSearchDTO={setSearchDTO} validationMessages={validationMessages} reset={reset} setReset={setReset}/>
                <br/>
                <PriceSelect searchDTO={searchDTO} setSearchDTO={setSearchDTO} fixedMinPrice={10000} fixedMaxPrice={1000000} priceGap={100}/>
            </div>
            <div className="search-footer">
                <div className="clear-button" onClick={onReset}>Clear all</div>
                <div className="search-button" onClick={onSearch}>Search</div>
            </div>
        </div>
    );
};

export default Searching;
