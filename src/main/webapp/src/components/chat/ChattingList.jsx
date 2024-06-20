import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './css/ChattingList.css';
import { GoArrowLeft } from "react-icons/go";

const ChattingList = () => {
    const navigate = useNavigate();
    const [chatRooms, setChatRooms] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('https://dongwoossltest.shop/api/messagesroom/roomuserInfo', { withCredentials: true });
                // const response = await axios.get('http://localhost:8080/api/messagesroom/roomuserInfo', { withCredentials: true });
                const user = response.data;
                setCurrentUser(user);
                setProfileImage(user.profile_image);
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
    useEffect(() => {
        if (currentUser) {
            fetchChatRooms(currentUser.name);
        }
    }, [currentUser]);

    if (loading) {
        return <div>로딩 중...</div>; // 한글로 수정
    }

   
    return (
        <div>
            <header style={{marginBottom: -10, width: '200px'}}>
            <div className="chat-headernav2" >
            <GoArrowLeft style={{width:'30px', height:'30px',
                marginTop:'5%', marginLeft:'15px'
            }}onClick={()=>{navigate(-1)}}
            />
            <h1 style={{textAlign:'center', 
                            font:'apple SD Gothic Neo',
                            fontSize:'18px',
                            marginTop:'-6%'
                           }}>
                <h2 className='currentName'>
                    {currentUser ? (
                    <>
            <span style={{ fontSize: '25px' }}>{currentUser.name}</span>
            'Message
                 </>
                ) : 'Message'}
                    </h2>
            </h1>
            </div>
            </header>
            
            <div className='chatlist'> 
                {chatRooms.length > 0 ? (
                    chatRooms.map((item) => (
                        
                        <div key={item.roomSeq} className='chatlistdetail'> 
                        <img src={profileImage} alt="Profile Image" className="profile-image" />
                        
                            <Link to={`/ChattingRoom/${item.roomSeq}`}  className="chat-link">
                                {item.hostName === currentUser.name ? item.guestName : item.hostName}
                            </Link>
                            <span>님과의 채팅</span>
                            <img src={`${process.env.PUBLIC_URL}/image/close.png`} alt="close Image" className="close-image" />
                            <hr/>
                        </div>
                    ))
                ) : (
                    <li>채팅방이 없습니다.</li>
                )}
            </div>
        </div>
    );
};

export default ChattingList;
