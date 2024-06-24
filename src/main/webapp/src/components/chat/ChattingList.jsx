import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/ChattingList.css';
import { GoArrowLeft } from "react-icons/go";
import FooterMenu from "../FooterMenu";
import { Box} from "@mui/material";
import moment from 'moment';


const ChattingList = () => {
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [otherProfileImage, setOtherProfileImage] = useState('');
    const [lastMessages, setLastMessages] = useState({}); // 변경된 부분: 마지막 메시지 객체로 상태 추가
    const [newMessages, setNewMessages] = useState({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://dongwoossltest.shop/api/messagesroom/roomuserInfo', { withCredentials: true });
                // const response = await axios.get('http://localhost:8080/api/messagesroom/roomuserInfo', { withCredentials: true });
                const user = response.data;
                setCurrentUser(user);
                setOtherProfileImage(user.profile_image);
                console.log('Current user:', user);
                if (user) {
                    fetchChatRooms(user.name);
                } else {
                    setLoading(false); // 사용자 정보가 없는 경우 loading을 false로 설정
                }
            } catch (error) {
                console.error('사용자 정보를 불러오는 중 에러 발생:', error); // 한글 에러 메시지 추가
                setLoading(false); // 에러 발생 시 loading을 false로 설정
            }
        };

        fetchUserInfo();
    }, []);

    const fetchChatRooms = async (userName) => {
        try {
            const response = await axios.get(`https://dongwoossltest.shop/api/messagesroom/user/${userName}/rooms`);
            // const response = await axios.get(`http://localhost:8080/api/messagesroom/user/${userName}/rooms`);
            console.log('서버로부터 받은 데이터:', response.data);

            // 데이터가 배열 형식인지 확인 후 처리
            if (Array.isArray(response.data) && response.data.length > 0) {
                setChatRooms(response.data);
            } else {
                console.error('채팅방 데이터가 배열 형식이 아닙니다:', response.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('채팅방 데이터를 불러오는 중 에러 발생:', error);
            setLoading(false);
        }
    };

    const fetchLastMessage = async (roomSeq) => {
        try {
            // const response = await axios.get(`http://localhost:8080/api/messages/rooms/${roomSeq}/lastmessage`);
            const response = await axios.get(`https://dongwoossltest.shop/api/messages/rooms/${roomSeq}/lastmessage`);

            const lastMessage = response.data;
            console.log('마지막 메시지:', lastMessage);
    
            setLastMessages(prevState => ({
                ...prevState,
                [roomSeq]: lastMessage
            }));
    
            // 마지막 메시지가 새 메시지인지 확인
            if (lastMessage.sender !== currentUser.name) {
                setNewMessages(prevState => ({
                    ...prevState,
                    [roomSeq]: true
                }));
            }else {
                setNewMessages(prevState => ({
                    ...prevState,
                    [roomSeq]: false
                }));
            }
        } catch (error) {
            console.error('마지막 메시지를 가져오는 중 오류 발생:', error);
        }
    };
  
    
    useEffect(() => {
        chatRooms.forEach(room => {
            fetchLastMessage(room.roomSeq);
        });
    }, [chatRooms]);

    useEffect(() => {
        if (currentUser) {
            fetchChatRooms(currentUser.name);
        }
    }, [currentUser]);
  
    const formatDate = (sentTime) => {
        const date = moment.utc(sentTime).toDate();
        const formattedDate = moment(date).local().format('Ahh:mm').replace('AM','오전').replace('PM','오후');
        return formattedDate;
         
    };

    if (loading) {
        return <div>로딩 중...</div>; // 한글로 수정
    }

   
    return (
        <>
            <Box sx={{ pb: 7 }}>
        <div>
            <header style={{marginBottom: -10, width: '200px'}}>
            <div className="chat-headernav2" >
            <GoArrowLeft style={{width:'30px', height:'30px',
                marginTop:'7%', marginLeft:'15px'
            }}onClick={()=>{navigate(-1)}}
            />
            <h1 style={{textAlign:'center', 
                            font:'apple SD Gothic Neo',
                            fontSize:'18px',
                            marginTop:'-6%'
                           }}>
                <h2 className='currentName'>
                    {/* {currentUser ? (
                    <> */}
            {/* <span style={{ fontSize: '25px' }}>{currentUser.name}</span> */}
            Your Chat
                 {/* </> */}
                {/* ) : 'Message'} */}
                    </h2>
            </h1>
            </div>
            </header>
            
            <div className='chatlist'> 
            {chatRooms.length > 0 ? (
                    chatRooms.map((item) => (
                        <div key={item.roomSeq} className='chatlistdetail'> 
                     <img src={`${process.env.PUBLIC_URL}/image/nullImage2.png`} alt="otherProfileImage" className="otherProfileImage" />
                    {/* <img src={otherProfileImage} alt="otherProfileImage" className="otherProfileImage" /> */}
                    <Link to={`/ChattingRoom/${item.roomSeq}`} className="chat-link">
                        {item.hostName === currentUser.name ? item.guestName : item.hostName}
                    </Link>
                    <div className="last-message">
                        {lastMessages[item.roomSeq] ? (
                            <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {lastMessages[item.roomSeq].content}
                            </div>
                        ) : (
                            <p>최근 메시지 없음</p>
                        )}
                    </div>
                    {newMessages[item.roomSeq] && (
                                    <span className="notification-indicator">zzz</span>
                    )}
                    {/* <img src={`${process.env.PUBLIC_URL}/image/close.png`} alt="close Image" className="close-image" /> */}
                    <div className="last-senttime">
                                  {lastMessages[item.roomSeq] ? (
                                 <div>
                                   <p className="time">{formatDate(lastMessages[item.roomSeq].sentTime)}</p>
                                </div>
                               ) : (
                                <p></p>
                             )}
                       </div>
                    <hr/>
                </div>    
                    ))
                ) : (
                    <li>채팅방이 없습니다.</li>
                )}
            </div>
        </div>
        </Box>
            <Box sx={{display: {xs: "flex", md: "none"}, marginTop: "auto"}}>
                <FooterMenu/>
            </Box>
        </>
    );
};

export default ChattingList;
