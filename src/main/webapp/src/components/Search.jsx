import React, { useEffect } from 'react';
import '../CSS/SearchCSS.css';
// import '../CSS/NaverMapCSS.css'

const Search = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=13hvi289g6`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const mapOptions = {
                center: new window.naver.maps.LatLng(37.5666103, 126.9783882), // 서울시청 위치로 초기화
                zoom: 18,
            };
            const map = new window.naver.maps.Map('map', mapOptions);

            const marker = new window.naver.maps.Marker({
                position: mapOptions.center,
                map: map,
            });

            const success = (location) => {
                const currentPosition = new window.naver.maps.LatLng(
                    location.coords.latitude,
                    location.coords.longitude
                );
                map.setCenter(currentPosition);
                marker.setPosition(currentPosition);
            };

            const error = () => {
                console.log('Unable to retrieve your location.');
            };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            }
        };

        script.onerror = () => {
            console.error('Failed to load the Naver Maps script.');
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div className="description">
                <div className="rating">
                    <img src="star_icon.png" alt="Star" width="16" height="16" />
                    <span>4.6 korea, Anyang</span>
                </div>
                <h1>속도와 스타일의 결정체, 스포츠카의 세계</h1>
                <p>자동차 소개 글, 자동차 소개 글자동차 소개 글</p>
            </div>
            <div className="owner-description">
                <div className="profile-pic"></div>
                <span>자동차 주인 소개</span>
            </div>
            <div className="border-line"></div>
            <div className="usage-time">사용 시간, 이용 시간 설정</div>
            <div className="grey-box small"></div>
            <div className="additional-info">후기 버튼, 위치 정보 지도, 태그,</div>
            <div className="mapContainer">
                <div>
                    <div id="map" className='map'></div>
                </div>
            </div>
            {/* <div className="grey-box large"></div> */}
            <div className="footer">
                <div className="price-time">
                    <span className="price">50,000원</span>
                    <span className="time">2024.06.07  17:00 <br />2024.06.09  10:00</span>
                </div>
                <div className="button-container">
                    <span className="button-text">예약 하기</span>
                </div>
            </div>
        </div>
    );
};

export default Search;
