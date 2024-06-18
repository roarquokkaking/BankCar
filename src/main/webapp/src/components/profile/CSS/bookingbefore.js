import React from 'react';
import styles from './bookingBefor.module.css';






const Bookingbefore = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                {/* 여기에 사진 넣기 */}
            </div>
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>예약 여부</h1>
                <p className={styles.description}>여기에 내용이 들어갑니다.</p>
            </div>
        </div>
    );
};

export default Bookingbefore;