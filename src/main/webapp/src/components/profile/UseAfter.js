import React, { useEffect, useState } from 'react';
import styles from './CSS/UseAfter.module.css';
import { GoArrowLeft } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import FooterMenu from "../FooterMenu";
import axios from "axios";

const UseAfter = ({ diTooData }) => {
    const navigate = useNavigate();
    const { user_id, car_id,booking_id } = useParams();
    const [BookingDTO, setBookingDTO] = useState([]);
    const [serchdata, setSerchdata] = useState('all');

    useEffect(() => {
        console.log('User ID:', user_id);
        console.log('Car ID:', car_id);
        console.log('booking' , BookingDTO.booking_id)
    }, [user_id, car_id]);

    const fetchData = (userId, period) => {
        if (!userId) {
            console.log('User ID is undefined');
            return;
        }

        const url = period === 'all' ?
            `https://dongwoossltest.shop/api/Booking/after/${userId}` :
            `https://dongwoossltest.shop/api/Booking/after/${userId}?period=${period}`;

        axios.get(url)
            .then(response => {
                const data = response.data;
                setBookingDTO(data);
                console.log(data);
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        if (user_id) {
            fetchData(user_id, serchdata);
        }
    }, [user_id, serchdata]);

    const handlePeriodChange = (e) => {
        setSerchdata(e.target.value);
    };
    let image = 'https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/';
    const ReservationItem = ({ reservation }) => (
        <div className={styles.reservationItem}>
            <div className={styles.reservationDetail}>
                <img src={image+reservation.imageUrl} alt={reservation.title} className={styles.reservationImage}></img>
                <h2 className={styles.title}>{reservation.title}</h2>
            </div>
            <div className={styles.actionContainer}>
                <span>{reservation.period}</span>
                <button
                    onClick={() => navigate(`/profile/useReview/${reservation.userId}/${reservation.carId}/${reservation.booking_id}`)}
                    style={{
                        backgroundColor: reservation.reviewWrite ? 'grey' : '#ff5f84',
                        padding: '10px',
                        color:'white',
                        borderRadius: '5px',
                        border: 'none',
                        cursor: 'pointer',
                        marginRight: '3%',
                        marginBottom: '3%'
                    }}
                >
                    {reservation.reviewWrite ? '후기 수정' : '후기 쓰기'}
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
                                    marginTop: "7%",
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
                    <select className={styles.searchDate} onChange={handlePeriodChange}>
                        <option value="2000">기간별 검색</option>
                        <option disabled>============</option>
                        <option value="2000">전체보기</option>
                        <option value="7">최근 7일</option>
                        <option value="15">최근 15일</option>
                        <option value="30">최근 30일</option>
                    </select>
                </div>
                {BookingDTO.map((reservation) => {
                    return (
                        <ReservationItem reservation={reservation} key={reservation.id}/>
                    );
                })}
            </Box>
            <FooterMenu />
        </div>
    );
};

export default UseAfter;
