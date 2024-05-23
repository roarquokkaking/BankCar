import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'; 
import { FaSearchLocation, FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import debounce from 'lodash.debounce';
import DatePicker from 'react-datepicker';
// import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

import '../CSS/SearchCSS.css';

const Search = () => {
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

    //맵 검색
    const [text, setText] = useState('')
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (text.trim() === '') return; 

            try {
                const response = await axios.get(`http://localhost:8080/search/detail`, {params: { text }});
                // 여기서 응답 데이터를 처리할 수 있습니다.
                const jsonData = response.data;
                // 필요한 정보 추출
                const items = jsonData.items;
                
                // 주소와 도로명 주소만을 리스트로 추출
                const addresses = items.map(item => ({
                    address: item.address,
                    roadAddress: item.roadAddress
                }));
                
                console.log(addresses);
                setResult(addresses);
            } catch (error) {
                console.error('Error fetching the search results:', error);
            }
        };

        fetchData();
    }, [text]);
    // const fetchResults = async (query) => {
    //     try {
    //         const response = await fetch(`http://localhost:8080/search/detail?text=${encodeURIComponent(query)}`);
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setResult(data);
    //     } catch (error) {
    //         console.error('Error fetching the search results:', error);
    //     }
    // };

    // const debouncedFetchResults = useCallback(debounce(fetchResults, 300), []);

    const onInput = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === 'text') {
            setText(value);
        }
    };
    const mapRef = useRef(null);


    useEffect(() =>{
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=13hvi289g6&submodules=geocoder`;
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
            const map = new window.naver.maps.Map(mapRef.current, {
                center: new window.naver.maps.LatLng(37.3595316, 127.1052133),
                zoom: 15,
                mapTypeControl: true
            });
            const marker = new window.naver.maps.Marker({
                position: map.center,
                map: map,
            });

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

                    const items = response.v2.results;
                    let address = '';
                    const htmlAddresses = [];

                    // for (let i = 0, ii = items.length; i < ii; i++) {
                    //     const item = items[i];
                    //     address = makeAddress(item) || '';
                    //     const addrType = item.name === 'roadaddr' ? '[도로명 주소]' : '[지번 주소]';

                    //     htmlAddresses.push((i + 1) + '. ' + addrType + ' ' + address);
                    // }

                    // infoWindow.setContent([
                    //     '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    //     '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
                    //     htmlAddresses.join('<br />'),
                    //     '</div>'
                    // ].join('\n'));

                    infoWindow.open(map, latlng);
                });
            }

            function searchAddressToCoordinate(address) {
                window.naver.maps.Service.geocode({
                    query: address
                }, function(status, response) {
                    if (status === window.naver.maps.Service.Status.ERROR) {
                        return alert('Something Wrong!');
                    }

                    if (response.v2.meta.totalCount === 0) {
                        return alert('totalCount' + response.v2.meta.totalCount);
                    }

                    const htmlAddresses = [];
                    const item = response.v2.addresses[0];
                    const point = new window.naver.maps.Point(item.x, item.y);

                    // if (item.roadAddress) {
                    //     htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
                    // }

                    // if (item.jibunAddress) {
                    //     htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
                    // }

                    // if (item.englishAddress) {
                    //     htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
                    // }

                    // infoWindow.setContent([
                    //     '<div style="padding:10px;min-width:200px;line-height:150%;">',
                    //     '<h4 style="margin-top:5px;">검색 주소 : ' + address + '</h4><br />',
                    //     htmlAddresses.join('<br />'),
                    //     '</div>'
                    // ].join('\n'));

                    map.setCenter(point);
                    marker.setPosition(point);
                    // infoWindow.open(map, point);
                });
            }

            function initGeocoder() {
                window.naver.maps.Event.addListener(map, 'click', function(e) {
                    searchCoordinateToAddress(e.coord);
                });

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

                searchAddressToCoordinate('정자동 178-1');
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
                    <input type="text" id="address" placeholder="Search by address" />
                    <button id="submit">Search</button>
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

export default Search;
