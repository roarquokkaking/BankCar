import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './CSS/MyRating.module.css';
import Details from "./Details";




const MyRating = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);
    const [ratings, setRatings] = useState([0, 0, 0, 0, 0]); // 각 점수별 투표 수

    const getAverage = (newRating) => {
        const newTotal = total + newRating;
        const newCount = count + 1;
        setTotal(newTotal);
        setCount(newCount);
        return newTotal / newCount;
    };

    const handleRating = (ratingValue) => {
        const newRatings = [...ratings];
        newRatings[ratingValue - 1] += 1;
        setRatings(newRatings);
        setRating(getAverage(ratingValue));
    };

    const maxVotes = Math.max(...ratings);

    return (
        <div>
            <h3 style={{textAlign:'center'}}>후기 페이지</h3>
            <Details/>
            <div className={styles.title}>

                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.average}>
                            <p>{rating.toFixed(1)}</p>
                        </div>
                        <div className={styles.starContainer}>
                            {[...Array(5)].map((star, index) => {
                                const ratingValue = index + 1;

                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => handleRating(ratingValue)}
                                            style={{display: 'none'}}
                                        />
                                        <FaStar
                                            className="star"
                                            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                            size={25}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(0)}
                                        />
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.right}>
                        {[5, 4, 3, 2, 1].map((score, index) => {
                            const percentage = (ratings[score - 1] / count) * 100 || 0; // 전체 클릭 수 대비 퍼센티지
                            return (
                                <div key={score} className={styles.gaugeContainer}>
                                    <span className={styles.label}>{score}</span>
                                    <div className={styles.gaugeBackground}>
                                        <div
                                            className={styles.gauge}
                                            style={{width: `${percentage}%`}}
                                        />
                                        <span className={styles.percentage}>{`${percentage.toFixed(1)}%`}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <input className={styles.inputTitle}/>
            <input className={styles.inputContext}/>
            <div className={styles.buttonDiv}>
                <button className={styles.button}>사진 추가</button>
                <button className={styles.button}>저장하기</button>
            </div>
        </div>
    );
};

export default MyRating;
