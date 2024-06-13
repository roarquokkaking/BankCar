import React, { useState, useEffect, useRef } from 'react';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { TextField, Button, MenuItem, Select } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './ChattingRoom.css'; // 채팅방 스타일을 정의하는 CSS 파일을 불러옵니다.
import moment from 'moment';

const ChattingRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selectedUser, setSelectedUser] = useState('User2'); // 선택된 사용자 상태 추가
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

        axios.get('http://localhost:8080/api/messages')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => console.error("There was an error!", error));

        return () => {
            stompClient.current.disconnect();
        };
    }, []);

    const sendMessage = (message) => {
        axios.post('http://localhost:8080/api/messages/send', message)
            .then(response => {
                console.log('Message sent successfully', response.data);
            })
            .catch(error => {
                console.error('There was an error sending the message', error);
            });
    };

    const handleSend = () => {
        const messageObj = { from: 'User1', to: selectedUser, content: message, timestamp: new Date().toISOString() };
        sendMessage(messageObj);
        setMessage('');
    };

    const formatDate = (dateString) => {
        try {
            // Moment.js를 사용하여 문자열을 날짜로 파싱하고 원하는 형식으로 변환
            const formattedDate = moment(dateString).format('A hh:mm');
            return formattedDate;
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    return (
        <div className="chat-room">
            <Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                variant="outlined"
                fullWidth
            >
                <MenuItem value="User2">User2</MenuItem>
                <MenuItem value="User3">User3</MenuItem>
                {/* 추가적인 사용자들 */}
            </Select>
            
            <div className="message-container">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message-box ${msg.from === 'User1' ? 'sent' : 'received'}`}
                    >
                        <div className="message-content">
                            <strong>{msg.from}</strong>: {msg.content}
                        </div>
                        <div className="message-timestamp">{formatDate(msg.timestamp)}</div>
                    </div>
                ))}
            </div>
            <TextField
                fullWidth
                variant="outlined"
                label="메시지를 입력하세요..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
            />
            <Button 
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSend}
                style={{
                    width: '80px',
                    padding: '10px',
                    marginLeft: '270.5px',
                    marginTop: '10px',
                    backgroundColor: '#a700a4',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                전송
            </Button>
        </div>
    );
};

export default ChattingRoom;
