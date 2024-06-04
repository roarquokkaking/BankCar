import React, { useContext } from 'react';
import styles from "./css/RegisterPublish.module.css"
import { RegisterContext } from "./RegisterContext";
import RegisterHeader from "./RegisterHeader";
import SwipeableTextMobileStepper from "./SwipeableTextMobileStepper";
import {insertCarData} from "./api/CarApiService";

export function RegisterPublish() {
    const { data, selectImages, onInsertData } = useContext(RegisterContext)

    // 가격 포맷 함수
    const formatPrice = (value) => {
        return new Intl.NumberFormat("ko-KR").format(value);
    };

    return (
        <>
            <RegisterHeader text={"입력한 정보 확인"} />
            <div className={styles.publish}>
                <table className={styles.infoTable}>
                    <tbody>
                    <tr>
                        <th>자동차 카테고리</th>
                        <td>{data.category}</td>
                    </tr>
                    <tr>
                        <th>모델명</th>
                        <td>{data.model}</td>
                    </tr>
                    <tr>
                        <th>출고연도</th>
                        <td>{data.released}</td>
                    </tr>
                    <tr>
                        <th>색상</th>
                        <td>{data.color}</td>
                    </tr>
                    <tr>
                        <th>크기</th>
                        <td>{data.segment}</td>
                    </tr>
                    <tr>
                        <th>자동차 위치</th>
                        <td>
                            위도 {data.latitude} <br />
                            경도 {data.longitude}
                        </td>
                    </tr>
                    <tr>
                        <th>시간당 가격</th>
                        <td>{formatPrice(data.price)}원</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{data.title}</td>
                    </tr>
                    <tr>
                        <th>설명</th>
                        <td>{data.content}</td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <h2>자동차 사진</h2>
                    {selectImages ?  <SwipeableTextMobileStepper images={selectImages} />
                        : <span>등록된 이미지가 없습니다.</span>}

                </div>
                <button className={styles.submit} onClick={onInsertData} style={{ marginTop: "10px" }}>자동차 정보 등록하기</button>
            </div>
        </>
    );
};
