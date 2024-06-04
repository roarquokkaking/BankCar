import React, { useEffect,useRef } from 'react';

const NaverMap = ({searchDTO,setSearchDTO}) => {
    const mapRef = useRef(null);

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
                    setSearchDTO({
                        ...searchDTO,
                        x:item.x,
                        y:item.y,
                        jibunAddress:item.jibunAddress,
                        roadAddress:item.roadAddress
                    });
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
    return (
        <div>
            <div id="map" style={{ width: '100%', height: '200px',border:'1px solid #ccc' }} ref={mapRef}></div>
        </div>
    );
};

export default NaverMap;