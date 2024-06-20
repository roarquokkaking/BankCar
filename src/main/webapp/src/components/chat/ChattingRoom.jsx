import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { TextField } from '@mui/material';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { GoArrowLeft } from "react-icons/go";
import './css/ChattingRoom.css';

const ChattingRoom = () => {
    const { roomSeq } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [userName, setUserName] = useState('');
    const socket = useRef(null);
    const stompClient = useRef(null);
    const messageEndRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axios.get('https://dongwoossltest.shop/api/messages/userInfo', { withCredentials: true });
                // axios.get('http://localhost:8080/api/messages/userInfo', { withCredentials: true })
                const userData = userResponse.data;
                setUserName(userData.name);
                setProfileImage(userData.profile_image.replace('http://', 'https://'));

                const messagesResponse = await axios.get(`https://dongwoossltest.shop/api/messages/roomseq/${roomSeq}`);
                // axios.get(`http://localhost:8080/api/messages/roomseq/${roomSeq}`)
                setMessages(messagesResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    
        socket.current = new SockJS('https://dongwoossltest.shop/api/chattingroom');
        // socket.current = new SockJS('http://localhost:8080/ws');
        stompClient.current = Stomp.over(socket.current);

        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/topic/public/${roomSeq}`, (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log('받은 메세지:', receivedMessage);
                setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            });
        });
        return () => {
            if (stompClient.current) {
                stompClient.current.disconnect();
                console.log('WebSocket 연결 해제');
            }
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // const handleSend = async () => {
    //     try {
    //         // 디버깅을 위해 변수 로그 추가
    //         console.log('userName:', userName);
    //         console.log('roomseq:', roomSeq);
    
    //         const messageObj = {
    //             sender: userName,
    //             content: message,
    //             timestamp: new Date().toISOString(),
    //             messageRoom: { roomSeq: roomSeq }
    //         };
    //         console.log('Sending message:', messageObj); // 디버깅을 위해 로그 추가
    //         const response = await axios.post('https://dongwoossltest.shop/api/messages/send', messageObj, { withCredentials: true });
    //         // const response = await axios.post('http://localhost:8080/api/messages/send', messageObj, { withCredentials: true });
    //         console.log('Message sent successfully', response.data);

    //         setMessages((prevMessages) => [...prevMessages, response.data]);
    //         setMessage('');
    //     } catch (error) {
    //         console.error('Error handling send:', error);
    //     }
    // };

    const handleSend = () => {
        if (stompClient.current && stompClient.current.connected) {
            const messageObj = {
                sender: userName,
                content: message,
                timestamp: new Date().toISOString(),
                messageRoom: { roomSeq: roomSeq }
            };
            console.log('보내는 메시지:', messageObj);
            stompClient.current.send("/api/messages/send", {}, JSON.stringify(messageObj));
            setMessage('');
            // setMessages((prevMessages) => [...prevMessages, response.data]);
        } else {
            console.error('WebSocket 클라이언트가 연결되지 않았습니다.');
        }
    };

    const formatTimestamp = (sentTime) => {
        const date = moment.utc(sentTime).toDate();
        const formattedDate = moment(date).local().format('Ahh:mm').replace('AM','오전').replace('PM','오후');
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
                                <img src={profileImage} alt="Profile Image" className="profile-image" />
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
                   
                    onClick={handleSend}
                    disabled={!message}//값 없을때 못보냄 
                >
                    전송
                </button>
                <img className="image-clip"src={`${process.env.PUBLIC_URL}/image/clip.png`} alt="clip" />
                <img className="image-emog"src={`${process.env.PUBLIC_URL}/image/emog.png`} alt="emog" />
                <img className="image-setting"src={`${process.env.PUBLIC_URL}/image/setting.png`} alt="setting" />
            </div>
        </div>
    );
};

export default ChattingRoom;
