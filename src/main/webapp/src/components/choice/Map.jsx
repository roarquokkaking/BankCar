import React from 'react';
import { StaticMap } from 'react-kakao-maps-sdk';

const Map = ({ address, coordinates }) => {
    return (
        <div className="mapContainer">
            <div>
                <span>주소지 : {address}</span>
            </div>
            <StaticMap 
                center={coordinates}
                style={{
                    width: "100%",
                    height: "250px",
                }}
                marker={coordinates}
                level={4}
            />
        </div>
    );
};

export default Map;