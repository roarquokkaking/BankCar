import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import {  Button, TextField } from '@mui/material';
import moment from 'moment';
import SendIcon from '@mui/icons-material/Send';
import './ChattingRoom.css';

const ChattingRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [userName, setUserName] = useState('');
    const socket = useRef(null);
    const stompClient = useRef(null);

    useEffect(() => {
        socket.current = new SockJS('http://localhost:8080/ws');
        stompClient.current = Stomp.over(socket.current);

        stompClient.current.connect({}, () => {
            stompClient.current.subscribe('/topic/public', (message) => {
                const receivedMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });

        axios.get('http://localhost:8080/api/messages/userInfo', { withCredentials: true })
            .then(response => {
                const userData = response.data;
                setUserName(userData.name);
                setProfileImage(userData.profile_image); // 프로필 이미지 설정
                console.log(response.data);
            })
            .catch(error => console.error("Error fetching user data:", error));

        axios.get('http://localhost:8080/api/messages')
            .then(response => {
                setMessages(response.data);
                console.log(response.data);
            })
            .catch(error => console.error("There was an error!", error));

        return () => {
            stompClient.current.disconnect();
        };
    }, []);

    const handleSend = async () => {
        try {
            const messageObj = { sender: userName, content: message, timestamp: new Date().toISOString() };
            const response = await axios.post('http://localhost:8080/api/messages/send', messageObj, { withCredentials: true });
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
                
                <img src="./image/clip.png" alt="Clip" />
            </div>
        </div>
    );
};

export default ChattingRoom;
