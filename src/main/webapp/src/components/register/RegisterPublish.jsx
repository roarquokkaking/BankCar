import React, {useContext} from 'react';
import styles from "./css/RegisterPublish.module.css"
import {RegisterContext} from "./RegisterContext";
import RegisterHeader from "./RegisterHeader";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";

export function RegisterPublish() {
    const {data, selectImages, onAddData, onAddImageFile, onAddSelectImages} = useContext(RegisterContext)

    // 가격 포맷 함수
    const formatPrice = (value) => {
        return new Intl.NumberFormat("ko-KR").format(value);
    };
    return (
        <>
            <RegisterHeader text={"입력한 정보 확인"}/>
            <div className={styles.publish}>
                <div className={styles.infoSection}>
                    <div className={styles.infoItem}><span>자동차 카테고리:</span> {data.category}</div>
                    <div className={styles.infoItem}><span>모델명:</span> {data.model}</div>
                    <div className={styles.infoItem}><span>출고연도:</span> {data.released}</div>
                    <div className={styles.infoItem}><span>색상:</span> {data.color}</div>
                    <div className={styles.infoItem}><span>자동차 위치:</span> <br />위도 {data.latitude} <br /> 경도 {data.longitude}</div>
                    <div className={styles.infoItem}><span>시간당 가격:</span> {formatPrice(data.price)}원</div>
                    <div className={styles.infoItem}><span>제목:</span> {data.title}</div>
                    <div className={styles.infoItem}><span>설명:</span> {data.content}</div>
                </div>
                <div >
                    <h2>자동차 사진</h2>
                    <SwipeableTextMobileStepper images={selectImages}/>
                    {/*<div className={styles.imageContainer}>*/}
                    {/*    {selectImages.map(img => (*/}
                    {/*        <img key={img} src={img} alt={`자동차 사진 ${img}`} className={styles.carImage}/>*/}
                    {/*    ))}*/}
                    {/*</div>*/}
                </div>
                <button className={styles.submit} style={{marginTop: "10px"}} >자동차 정보 등록하기</button>
            </div>
        </>
    );
};
