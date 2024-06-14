import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import {TextField } from '@mui/material';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import './ChattingRoom.css';

const ChattingRoom = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [userName, setUserName] = useState('');
    const socket = useRef(null);
    const stompClient = useRef(null);
    const messageEndRef = useRef(null); // 새로운 useRef 추가

    useEffect(() => {
        socket.current = new SockJS('https://dongwoossltest.shop/api/chattingroom', { withCredentials: true });
        stompClient.current = Stomp.over(socket.current);

        stompClient.current.connect({}, () => {
            stompClient.current.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });

        axios.get('https://dongwoossltest.shop/api/messages/userInfo', { withCredentials: true })
            .then(response => {
                const userData = response.data;
                setUserName(userData.name);
                setProfileImage(userData.profile_image); // 프로필 이미지 설정
                console.log(response.data);
            })
            .catch(error => console.error("Error fetching user data:", error));

        axios.get('https://dongwoossltest.shop/api/messages')
            .then(response => {
                setMessages(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("There was an error!", error));

        return () => {
            stompClient.current.disconnect();
        };
    }, []);

    useEffect(() => {
        scrollToBottom(); // 메시지 업데이트 시 자동 스크롤
    }, [messages]); // messages 배열이 변경될 때마다 호출

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
        try {
            const messageObj = { sender: userName, content: message, timestamp: new Date().toISOString() };
            const response = await axios.post('https://dongwoossltest.shop/api/messages/send', messageObj, { withCredentials: true });
            console.log('Message sent successfully', response.data);
            setMessage('');
        } catch (error) {
            console.error('Error handling send:', error);
        }
    };
    
    const formatTimestamp = (sentTime) => {
        const date = new Date(sentTime);
        // moment.lang('ko', {weekdays: ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"], weekdaysShort: ["일","월","화","수","목","금","토"],});

        const formattedDate = moment(date).format('Ahh:mm').replace('AM','오전').replace('PM','오후'); // 요일과 AM/PM 형식으로 시간 표시
        return formattedDate;
    };

    return (
        <div className="chat-room">
            <header style={{marginBottom: -10, width: '200px'}}>
            <div className="chat-headernav" >
            <GoArrowLeft style={{width:'30px', height:'30px',
                marginTop:'4%', marginLeft:'20px'
            }}onClick={()=>{navigate(-1)}}
            />
            <h1 style={{textAlign:'center', 
                            font:'apple SD Gothic Neo',
                            fontSize:'18px',
                            marginTop:'-6%'
                           }}>BankCarChat
            </h1>
            </div>
            </header>
            <div className="message-container">
                {messages.map((msg, index) => {
                    if (msg.sender === userName) {
                        return (
                            <div key={index} className="message-box-send">
                                <div className="message-info">
                                    
                                    <strong>{msg.sender}</strong>
                                    <img src={profileImage} alt="Profile Image" className="profile-image" />
                                </div>
                                <div className="message-content">
                                    {msg.content}
                                </div>
                                <div className="message-timestamp">
                                    {formatTimestamp(msg.sentTime)}
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index} className="message-box-receive">
                                <div className="message-info">
                                {/* <img src={profileImage} alt="Profile Image" className="profile-image" /> */}
                                <img src='./image/pulover.png' alt="Profile Image" className="profile-image" />
                                    <strong>{msg.sender}</strong> 
                                </div>
                                
                                <div className="message-content">
                                    {msg.content} 
                                </div>
                                <div className="message-timestamp">
                                    {formatTimestamp(msg.sentTime)}
                                </div>
                            </div>
                        );
                    }
                })}
                <div ref={messageEndRef} /> {/* 메시지 끝 부분에 ref 추가 */}
            </div>
            
            <div className="input-area">
                <TextField
                    fullWidth
                    variant="outlined"
                    label="메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
                />
                <button 
                    variant="contained"
                    endIcon={<SendIcon />}
                    onClick={handleSend}
                >
                    전송
                </button>
                <img className="image-clip"src="./image/clip.png" alt="Clip" />
                <img className="image-emog"src="./image/emog.png" alt="Clip" />
                <img className="image-setting"src="./image/setting.png" alt="Clip" />
            </div>
        </div>
    );
};

export default ChattingRoom;
