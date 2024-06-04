import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import ImageAndTextInput from './ImageAndTextInput';
import ChatList from './ChatList';
import axios from 'axios';

const ChattingRoom = ({ id, topic, roomNo }) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const url = 'http://localhost:8080/ws/chat';
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        axios.get('/api/messages', { params: { roomNo } })
            .then(response => {
                setMessages(response.data.messages);
            })
            .catch(error => {
                console.error('Failed to load messages:', error);
            });
    }, [roomNo]);

    const scrollToBottom = () => {
        const scrollHeight = messagesContainerRef.current?.scrollHeight;
        const height = messagesContainerRef.current?.clientHeight;
        const maxScrollTop = scrollHeight - height;
        messagesContainerRef.current?.scrollTo({ top: maxScrollTop, behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        if (stompClient) {
            return;
        }

        const sock = new SockJS(url);
        const stomp = new Client({
            webSocketFactory: () => sock,
            brokerURL: url,
            connectHeaders: {
                id: id
            },
            debug: (str) => {
                console.log(str);
            },
        });

        stomp.onConnect = () => {
            console.log('웹소켓 연결 성공');
            setStompClient(stomp);

            stomp.subscribe(`/sub/${topic}`, (message) => {
                const newMessage = JSON.parse(message.body);
                setMessages((prevMessages) => [...prevMessages, newMessage]);
            });
        };

        stomp.activate();

        return () => {
            if (stomp) {
                stomp.deactivate();
            }
        };
    }, [topic, id, url]);

    const handleImageUpload = async (imageFile) => {
        setSelectedImage(imageFile);

        // 이미지를 업로드하고, 업로드된 이미지의 URL을 반환받는 로직을 구현해야 합니다.
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            // 이미지를 업로드하는 API endpoint에 요청을 보냅니다.
            const response = await axios.post('/api/upload-image', formData);

            // 업로드된 이미지의 URL을 얻어옵니다.
            const imageUrl = response.data.imageUrl;

            // 이미지 URL을 메시지에 포함하여 sendMessage 함수를 호출합니다.
            sendMessage(imageUrl);
        } catch (error) {
            console.error('Failed to upload image:', error);
        }
    };

    const sendMessage = (imageUrl) => {
        if (stompClient && (messageInput || selectedImage)) {
            let message;
            if (selectedImage && imageUrl) {
                // 이미지가 있고 이미지 URL이 있는 경우
                message = {
                    roomNo,
                    id,
                    messageType: 1,
                    content: imageUrl,
                };
            } else if (messageInput) {
                // 텍스트 메시지인 경우
                message = {
                    roomNo,
                    id,
                    messageType: 0,
                    content: messageInput,
                };
            }

            if (message) {
                stompClient.publish({ destination: `/pub/${topic}`, body: JSON.stringify(message) });
                setMessageInput('');
                setSelectedImage(null);
            }
        }
    };

    return (
        <div style={{ position: 'relative', height: '100%', backgroundColor: '#F0F0F0' }}>
            <div ref={messagesContainerRef} style={{ height: 'calc(100% - 50px)', overflowY: 'auto', padding: '10px' }}>
                <ChatList messages={messages} id={id} />
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
                <ImageAndTextInput
                    messageInput={messageInput}
                    onTextChange={setMessageInput}
                    onImageUpload={handleImageUpload}
                    onSendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default ChattingRoom;
