import React, {useEffect, useState} from "react";
import {FaRegHeart, FaRegUserCircle, FaHome} from "react-icons/fa";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { BsChatLeftDots    } from "react-icons/bs";
import {BottomNavigation, BottomNavigationAction, Paper} from "@mui/material";

import Swal from "sweetalert2";
import axios from "axios";


const footerMenu = [
    {id: 1, text: "홈", icon: <FaHome size={18}/>, path: "/"},
    {
        id: 2,
        text: "위시리스트",
        icon: <FaRegHeart size={18}/>,
        path: "/wishList",
    },
    {
        id: 3,
        text: "위시리스트",
        icon: <FaRegHeart size={18}/>,
        path: "/mywishList",
    },
    {
        id: 4,
        text: "로그인",
        icon: <FaRegUserCircle size={18}/>,
        path: "/login",
    },
    {
        id: 5,
        text: "1:1채팅",
        icon: <BsChatLeftDots  size={18.8}/>,
        path: "/ChattingList",
    },
    {
        id: 6,
        text: "프로필",
        icon: <FaRegUserCircle size={18}/>,
        path: "/profile",
    },


];

const FooterMenu = () => {
    const [selected, setSelected] = useState(1);
    const id = useSelector((state) => state.Login.id);
    const [noti, setNoti] = useState([])
    const [notifications, setNotifications] = useState([]);

    const footerMenuFilter = id ?
        footerMenu.filter(item => [1, 3, 5, 6].includes(item.id)) :
        footerMenu.filter(item => [1, 2, 4].includes(item.id));

    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    useEffect(() => {
        const eventSource = new EventSource(`https://dongwoossltest.shop/api/subscribe/${id}`);
        eventSource.addEventListener('notification', function(event) {
            setNoti(prevNotifications => [...prevNotifications, event.data]);
        });
        return () => {
            eventSource.close();
        };
    }, []);

    // useEffect(() => {
    //     if(id){
    //         let url = `https://dongwoossltest.shop/api/push-notifications/${id}`;
    //         const sse = new EventSource(url);
    //
    //         sse.addEventListener("booking-event", (event) => {
    //             const data = JSON.parse(event.data);
    //             console.log(data)
    //             if(data.length > 0){
    //                 setNoti(data)
    //             }
    //         });
    //
    //         sse.onerror = () => {
    //             sse.close();
    //         };
    //         return () => {
    //             sse.close();
    //         };
    //     }
    //
    // }, []);
    // const handleNotify = () => {
    //     axios.get(`https://dongwoossltest.shop/api/notify/${id}`).then(res => {alert(res.data)})
    // };

    useEffect(() => {
        if(noti.length > 0){
            for(let i=0;i < noti.length;i++){
                console.log(noti[i])
                Toast.fire({
                    icon: 'success',
                    title: noti[i]
                })
            }
        }
    }, [noti])


    return (
        <Paper sx={{position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
            <BottomNavigation showLabels value={window.location.pathname} >
                {
                    footerMenuFilter.map(item =>
                        <BottomNavigationAction
                            key={item.id}
                            value={item.path}
                            label={item.text}
                            component={Link}
                            to={item.path}
                            onClick={(e) => setSelected(e.target.value)}
                            icon={item.icon}
                            style={{ color: window.location.pathname === item.path ? 'red' : 'inherit' }}
                        />
                    )
                }
            </BottomNavigation>
        </Paper>
    );
};

export default FooterMenu;
