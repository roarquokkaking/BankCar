import React from 'react';
import { FaStar } from 'react-icons/fa';
import styles from './CSS/MyRating.module.css';
import Box from "@mui/material/Box";
import axios from 'axios';

const MyRating = ({
                      title,
                      comment,
                      rating,  // 기본값 설정
                      hover,
                      ratings,  // 기본값 설정
                      count,  // 기본값 설정
                      handleTitleChange,
                      handleContentChange,
                      handleSubmit,
                      setHover,
                      submitRating
                  }) => {
    return (
        <div>
            <div className={styles.title}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.average}>
                            <p>{rating}</p>
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
                                            onClick={() => {
                                                submitRating(ratingValue);
                                            }}
                                            style={{ display: 'none' }}
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
                            const percentage = (ratings[score - 1] / count) * 100 || 0;
                            return (
                                <div key={score} className={styles.gaugeContainer}>
                                    <span className={styles.label}>{score}</span>
                                    <div className={styles.gaugeBackground}>
                                        <div
                                            className={styles.gauge}
                                            style={{ width: `${percentage}%` }}
                                        />
                                        <span className={styles.percentage}>{`${percentage.toFixed(1)}%`}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <Box>
                <input
                    className={styles.inputTitle}
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요."
                />
                <textarea
                    className={styles.inputContext}
                    value={comment}
                    onChange={handleContentChange}
                    placeholder="내용을 입력하세요."
                />
                <div className={styles.buttonDiv}>
                    <button className={styles.button} onClick={handleSubmit}>저장하기</button>
                </div>
            </Box>
        </div>
    );
};

export default MyRating;
