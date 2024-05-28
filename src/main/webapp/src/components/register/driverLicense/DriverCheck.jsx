import React, { useState } from 'react';
import styles from './css/DriverCheck.module.css';
import './css/Footer.css';
import { useLocation } from 'react-router-dom';

const DriverCheck = () => {
    const location = useLocation();
    const jsonBody = location.state?.response.images[0].fields;
    const imageName = location.state?.imageName;
    const imageUrl =`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/driverOCR/${imageName}`;
    const name = jsonBody.find(item=>item.name==="name").inferText;
    const number = jsonBody.find(item=>item.name==="number").inferText;
    const idnumber = jsonBody.find(item=>item.name==="idnumber").inferText;
    const opendate = jsonBody.find(item=>item.name==="opendate").inferText;
    // console.log("name="+name+""+imageName);
    const [info, setInfo] = useState({
        
        name: name,
        number: number,
        idnumber: idnumber,
        opendate: opendate,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo((prevInfo) => ({
          ...prevInfo,
          [name]: value,
        }));
      };
    return (
        <div className={styles["driver-info-container"]}>
      <div className={styles["license-card"]} style={{marginTop:'20%'}}>
        <img src={imageUrl} alt="Driver License" />
      </div>
      <h2>등록한 정보를 확인해주세요</h2>
      {/* <pre>{JSON.stringify(jsonBody, null, 2)}</pre> */}
      <div className={styles["info-item"]}>
        <label>이름</label>
        <input
          type="text"
          name="name"
          value={info.name}
          onChange={handleChange}
        />
      </div>
      <div className={styles["info-item"]}>
        <label>면허번호</label>
        <input
          type="text"
          name="number"
          value={info.number}
          onChange={handleChange}
        />
      </div>
      <div className={styles["info-item"]}>
        <label>주민번호</label>
        <input
          type="text"
          name="idnumber"
          value={info.idnumber}
          onChange={handleChange}
        />
      </div>
      
      <div className={styles["info-item"]}>
        <label>발급일</label>
        <input
          type="text"
          name="opendate"
          value={info.opendate}
          onChange={handleChange}
        />
      </div>
      <button className="capture-button" style={{marginLeft:'25%',marginTop:'20%'}} >운전면허증 등록하기</button>
    </div>
    );
};

export default DriverCheck;