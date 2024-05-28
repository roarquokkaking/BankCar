import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { json, useParams } from 'react-router-dom';

const DriverCheck = () => {
    const {imageName} = useParams();
    const [ocrData,setOcrData]=useState(null);
    const encodedImageName = encodeURIComponent(imageName);
    const jsonBody = {
        "images": [
          {
            "format": "png",
            "name": "medium",
            "data": null,
            "url": `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/driverOCR/${encodedImageName}`
          }
        ],
        "lang": "ko",
        "requestId": "string",
        "resultType": "string",
        "timestamp": Date.now(),
        "version": "V1"
      };

    useEffect(()=>{
        axios.post("https://a38f9drxdz.apigw.ntruss.com/custom/v1/31239/4ca06b2dc1422e572696ca3ed40326f7697fc20c038f7a227be0ef9f388404e0/infer",jsonBody,{
            headers: {
                "Content-Type": "application/json",
                "X-OCR-SECRET":"Vnl4YWJGTkxNV0NZckdKdUV0VHdoQVdiQkVwSE9ha0U=",
                
              },
        }).then(res=>{
            setOcrData(res.data);
        }).catch(error=>{
            console.error('Error fetching OCR data:', error);
        })
    },[imageName])
    return (
        <div>
            <span>{imageName}</span>
        </div>
    );
};

export default DriverCheck;