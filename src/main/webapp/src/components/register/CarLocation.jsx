import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from "./css/CarLocation.module.css";
import {Button} from '@mui/material';
import RegisterHeader from "./RegisterHeader";
import {RegisterContext} from "./RegisterContext";

const CarLocation = () => {
    const [value, setValue] = useState("");
    const [search, setSearch] = useState('');
    const mapContainer = useRef(null); // 지도를 표시할 div의 ref
    const {data,onAddData} = useContext(RegisterContext);      // 등록 데이터 context
    useEffect(() => {
            window.kakao.maps.load(() => {
                const center = new window.kakao.maps.LatLng(data.latitude, data.longitude);
                const mapOption = {
                    center: center,
                    level: 2,
                };

                const map = new window.kakao.maps.Map(mapContainer.current, mapOption);
                const ps = new window.kakao.maps.services.Places();

                // 지도를 클릭한 위치에 표출할 마커입니다
                const marker = new window.kakao.maps.Marker({
                    // 지도 중심좌표에 마커를 생성합니다
                    position: map.getCenter()
                });

                // 지도에 마커를 표시합니다
                marker.setMap(map);
                // 지도에 클릭 이벤트를 등록합니다
                // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
                window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                    // 클릭한 위도, 경도 정보를 가져옵니다
                    const latlng = mouseEvent.latLng;
                    const geocoder = new window.kakao.maps.services.Geocoder();

                    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), function(result, status) {
                        if (status === window.kakao.maps.services.Status.OK) {

                            var roadAddress = result[0].road_address ? result[0].road_address.address_name : "없습니다."
                            console.log(result[0].address.address_name)
                            console.log(roadAddress.toString())

                            onAddData("latitude", latlng.getLat());
                            onAddData("longitude", latlng.getLng());
                            onAddData("jibunAddress",  result[0].address.address_name)
                            onAddData("doroAddress", roadAddress.toString())

                        }
                    });

                    // 마커 위치를 클릭한 위치로 옮깁니다
                    marker.setPosition(latlng);
                    map.setCenter(latlng);
                });

                ps.keywordSearch(search, (data, status, pagination) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const bounds = new window.kakao.maps.LatLngBounds();

                        data.forEach((place) => {
                            bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
                        });

                        map.setBounds(bounds);
                    }
                });

            });

    }, [search,data]);

    return (
        <>
            <RegisterHeader text={"자동차 기본 위치 정보"} />
            <div className={styles.location}>
                <div>
                    주소 검색 :
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Button onClick={() => setSearch(value)}> 찾기</Button>
                </div>
                <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>
                <div id="clickLatlng">
                    <span>도로명 주소 : {data.doroAddress}</span><br />
                    <span>지번 주소 : {data.jibunAddress}</span>
                </div>
            </div>
        </>
    );
};

export default CarLocation;