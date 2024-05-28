import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'; 
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import DatePicker from 'react-datepicker';
// import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

import '../CSS/SearchCSS.css';

const Search = () => {
    // 달력
    // const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate,setStartDate] = useState(null);
    const [endDate,setEndDate] = useState(null);

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
          {value}
        </button>
      ));
      
    const [activeTab, setActiveTab] = useState('Stays');

    const mapRef = useRef(null);
    const [addr,setAddr] = useState({
        jibunAddress:"",
        roadAddress:"",
        x:"",
        y:""
    })

    useEffect(() =>{
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=13hvi289g6&submodules=geocoder`;
        script.async = true;
        document.body.appendChild(script);
        
        script.onload = () => {
            const map = new window.naver.maps.Map(mapRef.current, {
                center: new window.naver.maps.LatLng(null, null),
                zoom: 15,
            });
            const marker = new window.naver.maps.Marker({
                position: map.center,
                map: map,
            });

            const success = (location) => {
                const currentPosition = new window.naver.maps.LatLng(
                    location.coords.latitude,
                    location.coords.longitude
                );
                console.log(currentPosition);
                map.setCenter(currentPosition);
                marker.setPosition(currentPosition);
            };

            const error = () => {
                console.log('Unable to retrieve your location.');
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            }

            const infoWindow = new window.naver.maps.InfoWindow({
                anchorSkew: true
            });

            map.setCursor('pointer');

            function searchCoordinateToAddress(latlng) {
                infoWindow.close();

                window.naver.maps.Service.reverseGeocode({
                    coords: latlng,
                    orders: [
                        window.naver.maps.Service.OrderType.ADDR,
                        window.naver.maps.Service.OrderType.ROAD_ADDR
                    ].join(',')
                }, function(status, response) {
                    if (status === window.naver.maps.Service.Status.ERROR) {
                        return alert('Something Wrong!');
                    }
                    console.log("response" + response);
                    
                    const items = response.v2.results;
                    let address = '';
                    const htmlAddresses = [];

                    for (let i = 0, ii = items.length; i < ii; i++) {
                        const item = items[i];
                        address = makeAddress(item) || '';
                        const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

                        htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
                    }

                    infoWindow.setContent([
                        '<div style="padding:10px;min-width:200px;line-height:150%;">',
                        '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                        htmlAddresses.join('<br />'),
                        '</div>'
                    ].join('\n'));

                    infoWindow.open(map, latlng);
                });
            }

            function searchAddressToCoordinate(address) {

                window.naver.maps.Service.geocode({
                    query: address
                }, function(status, response) {
                    if (status === window.naver.maps.Service.Status.ERROR) {
                        return alert('잘못된 검색입니다');
                    }

                    if (response.v2.meta.totalCount === 0) {
                        return alert('totalCount' + response.v2.meta.totalCount);
                    }

                    const htmlAddresses = [];
                    const item = response.v2.addresses[0];
                    const point = new window.naver.maps.Point(item.x, item.y);

                    if (item.roadAddress) {
                        htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
                    }

                    if (item.jibunAddress) {
                        htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
                    }

                    if (item.englishAddress) {
                        htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
                    }
                    // console.log(item)
                    setSearchDTO({
                        ...searchDTO,
                        x:item.x,
                        y:item.y,
                        jibunAddress:item.jibunAddress,
                        roadAddress:item.roadAddress
                    });
                    // updateSearchDTO(item.jibunAddress, item.roadAddress, item.y, item.x);
                    // onInput(item.x,'x');
                    // onInput(item.y,'y');
                    infoWindow.setContent([
                        '<div style="padding:10px;min-width:200px;line-height:150%;">',
                        '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
                        htmlAddresses.join('<br />'),
                        '</div>'
                    ].join('\n'));

                    map.setCenter(point);
                    marker.setPosition(point);
                });
            }

            function initGeocoder() {

                document.getElementById('address').addEventListener('keydown', function(e) {
                    const keyCode = e.which;

                    if (keyCode === 13) { // Enter Key
                        searchAddressToCoordinate(document.getElementById('address').value);
                    }
                });

                document.getElementById('submit').addEventListener('click', function(e) {
                    e.preventDefault();

                    searchAddressToCoordinate(document.getElementById('address').value);
                });

            }

            function makeAddress(item) {
                if (!item) {
                    return;
                }

                const name = item.name;
                const region = item.region;
                const land = item.land;
                const isRoadAddress = name === 'roadaddr';

                let sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';

                if (hasArea(region.area1)) {
                    sido = region.area1.name;
                }

                if (hasArea(region.area2)) {
                    sigugun = region.area2.name;
                }

                if (hasArea(region.area3)) {
                    dongmyun = region.area3.name;
                }

                if (hasArea(region.area4)) {
                    ri = region.area4.name;
                }

                if (land) {
                    if (hasData(land.number1)) {
                        if (hasData(land.type) && land.type === '2') {
                            rest += '산';
                        }

                        rest += land.number1;

                        if (hasData(land.number2)) {
                            rest += ('-' + land.number2);
                        }
                    }

                    if (isRoadAddress === true) {
                        if (checkLastString(dongmyun, '면')) {
                            ri = land.name;
                        } else {
                            dongmyun = land.name;
                            ri = '';
                        }

                        if (hasAddition(land.addition0)) {
                            rest += ' ' + land.addition0.value;
                        }
                    }
                }

                return [sido, sigugun, dongmyun, ri, rest].join(' ');
            }

            function hasArea(area) {
                return !!(area && area.name && area.name !== '');
            }

            function hasData(data) {
                return !!(data && data !== '');
            }

            function checkLastString(word, lastString) {
                return new RegExp(lastString + '$').test(word);
            }

            function hasAddition(addition) {
                return !!(addition && addition.value);
            }

            window.naver.maps.onJSContentLoaded = initGeocoder;
        };
    }, []);

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

    const updateSearchDTO = (jibunAddress, roadAddress, y, x) => {
        onInput(jibunAddress, 'jibunAddress');
        onInput(roadAddress, 'roadAddress');
        onInput(y, 'y');
        onInput(x, 'x');
    };

    const onReset = (e)=>{
        e.preventDefault()
        setReset( !reset)
    }

    useEffect(() => {
        if (startDate) {
            onInput(startDate, 'startDate');
        }
    }, [startDate]);

    useEffect(() => {
        if (endDate) {
            onInput(endDate, 'endDate');
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
            // axios.get(`http://localhost:8080/search/searched?jibunAddress=${searchDTO.jibunAddress}+
            //            startDate=${searchDTO.startDate}+
            //            endDate=${searchDTO.endDate}+
            //            startTime=${searchDTO.startTime}+
            //            endTime=${searchDTO.endTime}+`,)
            // .then(res => {
            //     alert('완료')
            // })
            // .catch(error => console.log(error))
        }
    }

    return (
        <div>
            <div className="header">
                <div className={`tab ${activeTab === 'Rent' ? 'active' : ''}`} onClick={() => setActiveTab('Rent')}>
                    Rent
                </div>
                <div className={`tab ${activeTab === 'Experiences' ? 'active' : ''}`} onClick={() => setActiveTab('Experiences')}>
                    Experiences
                </div>
            </div>
            <div className="search-container">
                <h2>오데가노?</h2>
                <div className="search-bar">
                    <FaSearchLocation className='FaSearchLocation' size='25' />
                    <input type="text" id="address" placeholder="위치 찾기" />
                    <button id="submit" onClick={handleSearchClick}>Search</button>
                    {/* <input type="text" name="text" value={text} onChange={onInput} placeholder="Search destinations" />
                    {result && (
                        <div className="results">
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )} */}
                </div>
                <div id="map" style={{ width: '100%', height: '200px',border:'1px solid #ccc' }} ref={mapRef}></div>
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
                                onInput(endDate,'endDate');
                                onInput(startDate,'startDate');
                            }}
                            withPortal
                            // locale={ko}
                        />
                        <div>{dateRangeDiv}</div>
                        <br/>
                        <DatePicker
                            name="startTime"
                            placeholderText="대여 가능 시간"
                            selected={startTime}
                            onChange={(date) => {
                                setStartTime(date)
                                onInput(date,'startTime');
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
                            onChange={(date) => {
                                setEndTime(date)
                                onInput(date,'endTime');
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
            <div className="footer">
                <div className="clear-button" type="reset" onClick={onReset}>Clear all</div>
                <div className="search-button" type="button" onClick={onSearch}>Search</div>
            </div>
        </div>
    );
};

export default Search;
