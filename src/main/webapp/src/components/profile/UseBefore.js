import React, { useEffect, useState } from 'react';
import styles from './CSS/UseAfter.module.css';
import { GoArrowLeft } from "react-icons/go";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import FooterMenu from "../FooterMenu";
import * as reservation from "date-fns/locale";


const UseBefore = () => {
    const navigate = useNavigate();
    // const user_id = useSelector(state => state.Login.id);
    const { user_id } = useParams();
    const [BookingDTO, setBookingDTO] = useState([]);


    useEffect(() => {
        axios.get(`/Booking/before/${user_id}`)
            .then(response => {
                console.log(response.data)
                setBookingDTO(response.data);
            })
            .catch(error => console.log(error));
    }, [user_id]);

    const navigateToReviewPage = (reservationId) => {
        navigate(-1);
    };

    const ReservationItem = ({ reservation }) => (
        <div className={styles.reservationItem}>
            <div className={styles.reservationDetail}>
                <img src={reservation.imageUrl} alt={reservation.title} className={styles.reservationImage} />
                <h2 className={styles.title}>{reservation.title}</h2>
            </div>
            <div className={styles.actionContainer}>
                <span>{reservation.period}</span>
                <Link to={`/bookingDetails/`}>{/*${car_id}*/}
                    <button onClick={() => navigateToReviewPage(reservation.user_id)}>상세정보</button>
                </Link>
            </div>
        </div>
    );
    console.log(user_id)

    return (
        <div>
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
                        >이용내역</h1>
                    </div>
                </header>
            </div>
            {BookingDTO.map((reservation) => (
                <ReservationItem reservation={reservation} key={reservation.id} />
            ))}
            <FooterMenu />
        </div>
    );
};

export default UseBefore;
