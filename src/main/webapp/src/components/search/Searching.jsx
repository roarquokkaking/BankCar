import React, { useState } from 'react'; 
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

import '../../CSS/SearchCSS.css';
import NaverMap from './NaverMap';
import DateTimePicker from './DateTimePicker';
import PriceSelect from './PriceSelect';

const Searching = () => {
    // 달력
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    // const addDaysAndFormat = (date) => {
    //     const newDate = new Date(date);
    //     newDate.setDate(newDate.getDate() + 1);

    //     return newDate.toISOString().split('T')[0];
    // };

    // const addHoursAndFormat = (time) => {
    //     const newTime = new Date(time);
    //     newTime.setHours(newTime.getHours());
    
    //     const hoursFormatted = String(newTime.getHours()).padStart(2, '0');
    //     const minutes = String(newTime.getMinutes()).padStart(2, '0');
    
    //     return `${hoursFormatted}:${minutes}`;
    // };

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
            <div className="search-header"></div>
            <div className="search-container">
                <h2>오데가노?</h2>
                <NaverMap  searchDTO={searchDTO} setSearchDTO={setSearchDTO}/>
                <br/>
                <DateTimePicker  searchDTO={searchDTO} setSearchDTO={setSearchDTO}/>
                <br/>
                <PriceSelect fixedMinPrice={10000} fixedMaxPrice={1000000} priceGap={100}/>
            </div>
            <div className="search-footer">
                <div className="clear-button" type="reset" onClick={onReset}>Clear all</div>
                <div className="search-button" type="button" onClick={onSearch}>Search</div>
            </div>
        </div>
    );
};

export default Searching;
