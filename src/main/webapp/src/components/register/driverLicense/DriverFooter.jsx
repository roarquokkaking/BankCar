import React, { useRef, useState } from 'react';
import './css/Footer.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const DriverFooter = () => {

    const navigate =useNavigate();
    const [ocrData,setOcrData]=useState(null);
    const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const imgChange = (e) =>{
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("img",file);

    axios.post("http://localhost:8080/driver/upload",formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(res=>{
        setOcrData(res.data);
        navigate("/car/driverCheck",{state:res.data})

      })


  }
    return (
        <div className="Footer">
        <input type="file" accept="image/*" capture="camera" ref={fileInputRef} onChange={imgChange} hidden />
        <button className="capture-button"   onClick={handleButtonClick} >운전면허증 촬영하기</button>
      </div>
    );
};

export default DriverFooter;