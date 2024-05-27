import React, { useEffect, useState } from 'react';
import useKakaoLoader from './useKakaoLoader';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import styles from "./css/CarLocation.module.css";
import { Button } from '@mui/material';

const CarLocation = () => {
   const [info, setInfo] = useState();
   const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const appKey = "60daea3e271bcc18daa50953750e7976";
  useKakaoLoader(appKey);

   useEffect(() => {
     if (!map) return;
     const ps = new window.kakao.maps.services.Places();

     ps.keywordSearch("안양", (data, status, _pagination) => {
       if (status === window.kakao.maps.services.Status.OK) {
         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
         // LatLngBounds 객체에 좌표를 추가합니다
         const bounds = new window.kakao.maps.LatLngBounds();
         let markers = [];

         for (var i = 0; i < data.length; i++) {
           // @ts-ignore
           markers.push({
             position: {
               lat: data[i].y,
               lng: data[i].x,
             },
             content: data[i].place_name,
           });
           // @ts-ignore
           bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
         }
         setMarkers(markers);

         // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
         map.setBounds(bounds);
       }
     });
   }, [map]);
  return (
    <div className={styles.container}>
      <div>
        주소 검색 :
        <input type="text" />
        <Button> 찾기</Button>
      </div>
      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <div style={{ color: "#000" }}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>
    </div>
  );
};

export default CarLocation;