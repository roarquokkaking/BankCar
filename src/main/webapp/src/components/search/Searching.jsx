import React, { useEffect, useRef, useState } from 'react'; 
import { useNavigate} from 'react-router-dom';
import { FaSearchLocation } from 'react-icons/fa';
import axios from 'axios';
import DatePicker from 'react-datepicker';
// import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

import '../../CSS/SearchCSS.css';
import NaverMap from './NaverMap';
import DateTimePicker from './DateTimePicker';

const Searching = () => {
    // 달력
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

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
    
    const [addr,setAddr] = useState({
        jibunAddress:"",
        roadAddress:"",
        x:"",
        y:""
    })

    const nav = useNavigate()

    const [reset, setReset] = useState(false)
    const [dateRangeDiv, setDateRangeDiv] = useState('')
    const [startTimeDiv, setStartTimeDiv] = useState('')
    const [endTimeDiv, setEndTimeDiv] = useState('')

    const [searchDTO, setSearchDTO] = useState({
        startDate:'',
        endDate:'',
        startTime:'',
        endTime:'',
        jibunAddress: "",
        roadAddress: "",
        x: "",
        y: ""
    })

    const onReset = (e)=>{
        e.preventDefault()
        setReset(!reset)
    }

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


    const handleSearchClick = () => {
        console.log(addr)
    };
    const onInput = (value, name) => {
        setSearchDTO({
          ...searchDTO,
          [name]:value
        });
        console.log(searchDTO);
    };    
    const onSearch = () =>{
        setStartTimeDiv('')
        setEndTimeDiv('')
        setDateRangeDiv('')

        if(startDate === null | endDate === null){
            setDateRangeDiv('기간을 입력하세요')
        }
        else if(startTime === null){
            setStartTimeDiv('시간을 입력하세요')
        }
        else if(endTime === null){
            setEndTimeDiv('시간을 입력하세요')
        }
        else{
            axios.post("http://localhost:8080/searching/searchList", null,{params:searchDTO})
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <div className="header">
                {/* <div className={`tab ${activeTab === 'Rent' ? 'active' : ''}`} onClick={() => setActiveTab('Rent')}>
                    Rent
                </div>
                <div className={`tab ${activeTab === 'Experiences' ? 'active' : ''}`} onClick={() => setActiveTab('Experiences')}>
                    Experiences
                </div> */}
            </div>
            <div className="search-container">
                <h2>오데가노?</h2>
                <div className="search-bar">
                    <FaSearchLocation className='FaSearchLocation' size='25' />
                    <input type="text" id="address" placeholder="위치 찾기" />
                    <button id="submit" onClick={handleSearchClick}>Search</button>
                </div>
                <NaverMap 
                    searchDTO={searchDTO} 
                    setSearchDTO={setSearchDTO}
                />
                <DateTimePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    startTime={startTime}
                    setStartTime={setStartTime}
                    endTime={endTime}
                    setEndTime={setEndTime}
                    dateRangeDiv={dateRangeDiv}
                    startTimeDiv={startTimeDiv}
                    endTimeDiv={endTimeDiv}
                    addHoursAndFormat={addHoursAndFormat}
                    onInput={onInput}
                />
            </div>
            <div className="footer">
                <div className="clear-button" type="reset" onClick={onReset}>Clear all</div>
                <div className="search-button" type="button" onClick={onSearch}>Search</div>
            </div>
        </div>
    );
};

export default Searching;
