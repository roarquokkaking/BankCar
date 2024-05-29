import React, {useEffect, useRef, useState} from 'react';
import useKakaoLoader from './useKakaoLoader';
import {Map, MapMarker} from "react-kakao-maps-sdk";
import styles from "./css/CarLocation.module.css";
import {Button} from '@mui/material';
import RegisterHeader from "./RegisterHeader";

const CarLocation = () => {
    const [value, setValue] = useState("");
    const [search, setSearch] = useState('');
    const mapContainer = useRef(null); // 지도를 표시할 div의 ref
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
            window.kakao.maps.load(() => {
                const center = new window.kakao.maps.LatLng(37.566826, 126.9786567);
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

                    // 마커 위치를 클릭한 위치로 옮깁니다
                    marker.setPosition(latlng);

                    const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;

                    const resultDiv = document.getElementById('clickLatlng');
                    resultDiv.innerHTML = message;
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

    }, [search]);
//
//     // 장소 검색 객체를 생성합니다
//     var ps = new window.kakao.maps.services.Places();
//     // 키워드로 장소를 검색합니다
//     ps.keywordSearch('이태원 맛집', (data, status, pagination) => {
//         if (status === window.kakao.maps.services.Status.OK) {
//             const bounds = new window.kakao.maps.LatLngBounds();
//
//             data.forEach((place) => {
//                 bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
//             });
//
//             map.setBounds(bounds);
//         }
//     });
//
//
//
//     const mapContainer = document.getElementById('map'), // 지도를 표시할 div
//         mapOption = {
//             center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
//             level: 3 // 지도의 확대 레벨
//         };
//
//     const map = new window.kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
//
// // 지도를 클릭한 위치에 표출할 마커입니다
//     const marker = new window.kakao.maps.Marker({
//         // 지도 중심좌표에 마커를 생성합니다
//         position: map.getCenter()
//     });
// // 지도에 마커를 표시합니다
//     marker.setMap(map);
//
// // 지도에 클릭 이벤트를 등록합니다
// // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
//     window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
//
//         // 클릭한 위도, 경도 정보를 가져옵니다
//         var latlng = mouseEvent.latLng;
//
//         // 마커 위치를 클릭한 위치로 옮깁니다
//         marker.setPosition(latlng);
//
//         var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
//         message += '경도는 ' + latlng.getLng() + ' 입니다';
//
//         var resultDiv = document.getElementById('clickLatlng');
//         resultDiv.innerHTML = message;
//
//     });

    // useEffect(() => {
    //     if (!map) return;
    //     const ps = new window.kakao.maps.services.Places();
    //
    //     ps.keywordSearch("안양", (data, status, _pagination) => {
    //         if (status === window.kakao.maps.services.Status.OK) {
    //             // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //             // LatLngBounds 객체에 좌표를 추가합니다
    //             const bounds = new window.kakao.maps.LatLngBounds();
    //             let markers = [];
    //
    //             for (var i = 0; i < data.length; i++) {
    //                 // @ts-ignore
    //                 markers.push({
    //                     position: {
    //                         lat: data[i].y,
    //                         lng: data[i].x,
    //                     },
    //                     content: data[i].place_name,
    //                 });
    //                 // @ts-ignore
    //                 bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
    //             }
    //             setMarkers(markers);
    //
    //             // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //             map.setBounds(bounds);
    //         }
    //     });
    // }, [map]);
    return (
        <>
            <RegisterHeader text={"자동차 기본 위치 정보"} />
            <div className={styles.location}>
                <div>
                    주소 검색 :
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                    <Button onClick={() => setSearch(value)}> 찾기</Button>{search}
                </div>
                <div ref={mapContainer} style={{ width: '100%', height: '400px' }}></div>
                <div id="clickLatlng"></div>
                {/*<Map // 로드뷰를 표시할 Container*/}
                {/*    center={{*/}
                {/*        lat: 37.566826,*/}
                {/*        lng: 126.9786567,*/}
                {/*    }}*/}
                {/*    style={{*/}
                {/*        width: "100%",*/}
                {/*        height: "350px",*/}
                {/*    }}*/}
                {/*    level={3}*/}
                {/*    onCreate={setMap}*/}
                {/*>*/}
                {/*    {markers.map((marker) => (*/}
                {/*        <MapMarker*/}
                {/*            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}*/}
                {/*            position={marker.position}*/}
                {/*            onClick={() => setInfo(marker)}*/}
                {/*        >*/}
                {/*            {info && info.content === marker.content && (*/}
                {/*                <div style={{color: "#000"}}>{marker.content}</div>*/}
                {/*            )}*/}
                {/*        </MapMarker>*/}
                {/*    ))}*/}
                {/*</Map>*/}
            </div>
        </>
    );
};

export default CarLocation;