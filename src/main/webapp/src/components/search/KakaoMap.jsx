import React, { useEffect, useState } from 'react';
import { FaSearchLocation } from 'react-icons/fa';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

const KakaoMap = ({ searchDTO, setSearchDTO }) => {
    useKakaoLoader();

    const [info, setInfo] = useState(null);
    const [marker, setMarker] = useState(null);
    const [map, setMap] = useState(null);
    const [keyword, setKeyword] = useState('');

    const updateAddressAndCoordinates = (latLng) => {
        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(latLng.getLng(), latLng.getLat(), (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const roadAddress = result[0].road_address ? result[0].road_address.address_name : '';
            const jibunAddress = result[0].address.address_name;
            setSearchDTO({
              ...searchDTO,
              roadAddress,
              jibunAddress,
              x: latLng.getLng().toString(),
              y: latLng.getLat().toString(),
            });
            console.log(searchDTO);
          }
        });
      };

    useEffect(() => {
        if (!map) return
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const currentLocation = {
              position: {
                lat: latitude,
                lng: longitude,
              },
              content: '현재 위치',
            };
            setMarker(currentLocation);
            map.setCenter(new window.kakao.maps.LatLng(latitude, longitude));
            updateAddressAndCoordinates(new window.kakao.maps.LatLng(latitude, longitude));
        });
    }, [map]);
    
    const handleSearchClick = () => {
        if (!map) return;
        const ps = new window.kakao.maps.services.Places();
    
        ps.keywordSearch(keyword, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const place = data[0];
                const newMarker = {
                position: {
                    lat: place.y,
                    lng: place.x,
                },
                content: place.place_name,
                };
                setMarker(newMarker);
                map.setCenter(new window.kakao.maps.LatLng(place.y, place.x));
                updateAddressAndCoordinates(new window.kakao.maps.LatLng(place.y, place.x));
            }
        });
    };

    return (
        <>
            <div className="search-bar">
                <FaSearchLocation className='FaSearchLocation' size='25' />
                <input 
                type="text" 
                id="address" 
                placeholder="위치 찾기" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
                />
                <button id="submit" onClick={handleSearchClick}>Search</button>
            </div>
            <Map
                center={{ lat: 37.566826, lng: 126.9786567 }}
                style={{ width: "100%", height: "350px" }}
                level={3}
                onCreate={setMap}
                onClick={(map, mouseEvent) => {
                    const latLng = mouseEvent.latLng;
                    const newMarker = {
                      position: {
                        lat: latLng.getLat(),
                        lng: latLng.getLng(),
                      },
                      content: '클릭한 위치',
                    };
                    setMarker(newMarker);
                    updateAddressAndCoordinates(latLng);
                }}
            >
                {marker && (
                <MapMarker
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                >
                </MapMarker>
                )}
            </Map>
        </>
    );
};

export default KakaoMap;