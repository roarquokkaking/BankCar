// UseAfter.js
import React, { useEffect, useState } from 'react';
import styles from './CSS/UseAfter.module.css';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import FooterMenu from "../FooterMenu";


const UseAfter = () => {
    const navigate = useNavigate();
    const [pastReservations, setPastReservations] = useState([]);






    const navigateToReviewPage = (reservationId) => {
        navigate(-1);
    };






    const ReservationItem = ({ reservation }) => (
        <div className={styles.reservationItem}>
            <div className={styles.reservationDetail}>
                <img src={reservation.imageUrl} alt={reservation.title} className={styles.reservationImage}></img>
                <h2 className={styles.title}>{reservation.title}</h2>
            </div>
            <div className={styles.actionContainer}>
                <span>{reservation.period}</span>
                <button
                    onClick={() => navigateToReviewPage(reservation.id)}
                    style={{
                        backgroundColor: reservation.reviewWritten ? 'grey' : '#008EDC',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '2%',
                        marginBottom: '2%'
                    }}
                >
                    {reservation.reviewWritten ? '후기 수정' : '후기 쓰기'}
                </button>
            </div>
        </div>
    );

    return (
        <div>
            <Box>
                <div className={styles.container}>
                    <header>
                        <div>
                            <GoArrowLeft
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    marginTop: "4%",
                                    marginLeft: "20px",
                                }}
                                onClick={() => navigate(-1)}
                            />
                            <h1
                                style={{
                                    textAlign: "center",
                                    font: "apple SD Gothic Neo",
                                    fontSize: "18px",
                                    marginTop: "-9%",
                                }}
                            >이용내역
                            </h1>
                        </div>
                    </header>
                </div>
                <div className={styles.selectContainer}>
                    <select className={styles.searchDate}>
                        <option>기간별 검색</option>
                        <option>============</option>
                        <option>최근 7일</option>
                        <option>최근 15일</option>
                        <option>최근 30일</option>
                    </select>
                </div>
                {pastReservations.map((reservation) => (
                    <ReservationItem reservation={reservation} key={reservation.id} />
                ))}
            </Box>
            <FooterMenu />
        </div>
    );
};

export default UseAfter;
