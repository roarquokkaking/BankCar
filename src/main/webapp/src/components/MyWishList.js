import React, {useEffect, useState} from 'react';
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import {GoArrowLeft} from "react-icons/go";
import {useNavigate, useParams} from "react-router-dom";
import Footer from "./Footer";
import FooterMenu from "./FooterMenu";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa6";
import ComponentHeader from "./profile/ComponentsHeader";

const styles = {
    // listItem: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     marginBottom: '10px',
    //     marginRight: '40px',
    //     marginTop:'30px',
    //     border: 'solid 2px #FF8A8A',
    //     borderRadius: '15px',
    //     position: 'relative',
    //     height: '130px '
    //
    // },
    // image: {
    //     border: '1px solid ,gray',
    //     borderRadius: '10px',
    //     marginTop: '10px',
    //     marginLeft: '10px',
    //     marginBottom: '10px',
    //     marginRight: '10px',
    //     height: '100px',
    //     width: '100px'
    // },
    //
    // title: {
    //     marginLeft: '23px',
    //     marginTop: '-30px',
    //     fontSize : 'lazy',
    //     flex: 1,
    // },
    //
    // favoriteIcon: {
    //     position: 'absolute',
    //     right: '12px',
    //     bottom: 'center',
    //     color: '#f30404',
    //     fontSize: '25pt',
    //     cursor: 'pointer',
    //
    // },
    // IoIosArrowDown:{
    //     fontSize:'20%',
    //     marginBottom : '15%'
    //
    // },
    // IoHeartSharp:{
    //   marginRight:"5%"
    // },
    // isFavorite:{
    //   size : '20px',
    // },
    // loadMoreButton: {
    //     display: 'block',
    //     margin: '20px auto',
    //     padding: '10px 20px',
    //     fontSize: '14px',
    //     cursor: 'pointer',
    //     borderRadius:'15px',
    //     width:'100px',
    //     height:'45px'
    // },
    Box:{
        marginTop: '50%',
        fontSize:'lazy'
    },
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px',
            padding: '10px',
            boxSizing: 'border-box',
        },
    bottomStyle:{
      height: '20%',
        bottom: '20%'
    },
        listItem: {
            width: 'calc(50% - 20px)', // 간격을 고려한 너비 조정
            border: '2px solid #ccc',
            padding: '10px',
            boxSizing: 'border-box',
            textAlign: 'center',
            listStyle: 'none',
            // marginTop: 'px',
            borderRadius: '8px',
        },
        image: {
            width: '100%',
            height: '70%',
            borderRadius: '7%',
        },
        title: {
            fontSize: '14px',
            margin: '8px 0',
        },
        favoriteIcon: {
            color: 'red',
            cursor: 'pointer',
            fontSize: '20px',
        },
        loadMoreButton: {
            display: 'flex',
            position: 'fixed',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            bottom: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20pt',
        },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 20px', // 패딩을 줄입니다
        position: 'fixed',
        marginBottom: '15%', // 여백을 늘립니다
        top: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 800,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
    },
    headerTitle: {
        textAlign: 'center',
        fontFamily: 'Apple SD Gothic Neo', // 폰트 패밀리 수정
        fontSize: '20px', // 폰트 크기 증가
        flexGrow: 1,
        marginLeft: '-40px',
    },
    iconCount: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
    },
};

const MyWishList = () => {
    const user_id = useSelector(state => state.Login.id);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [wishListDTO, setWishListDTO] = useState([]);



console.log(wishListDTO)
    const fetchWishList = (page) => {
        if (!user_id) return; // user_id가 없을 경우 요청하지 않음
        console.log("userId = ", user_id)
        axios.get(`https://dongwoossltest.shop/api/WishList/MyWishList/${user_id}?page=${page}&size=6`)
            .then(response => {
                console.log(response.data)
                const data = response.data || []; // response.data.wishList가 배열인지 확인
                if (data.length < 6) {
                    setHasMore(false);
                }
                setWishListDTO(prevWishList => [...prevWishList, ...data]);
                console.log('222='+wishListDTO)
            })
            .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchWishList(page);
    }, [user_id, page]);

    const loadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const toggleFavorite = (user_id, car_id) => {
        axios.post(`https://dongwoossltest.shop/api/WishList/wish/toggle/${user_id}/${car_id}`)
            .then(response => {
                console.log("click 후 : "+response.data)
                setWishListDTO(response.data)
            })
            .catch(error => console.log(error));
    };


    return (
        <div>

            <ComponentHeader text={"예약 리스트 "} style={{marginTop: "5%" ,marginBottom:'10%' }}/>
            <div className={styles.buttomStyle}>
            <Box sx={{pb: 7}}>
                <ul style={styles.container}>
                    {wishListDTO.map((item, index) => (
                        <li
                            key={item.id}
                            style={styles.listItem}
                        >
                            <img
                                src={`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${item.imageUrl}`}
                                alt={item.title}
                                style={styles.image}
                            />
                            <p style={styles.title}>{item.title}</p>
                            {item.isFavorite ? (
                                <IoHeartSharp
                                    style={styles.favoriteIcon}
                                    onClick={() => toggleFavorite(item.id, item.carId)}
                                />
                            ) : (
                                <IoHeartOutline
                                    style={styles.favoriteIcon}
                                    onClick={() => toggleFavorite(item.id, item.carId)}
                                />
                            )}
                        </li>
                    ))}
                </ul>

                {hasMore && (
                    <div style={styles.loadMoreButton}>
                        <IoIosArrowDown onClick={loadMore} size={24}/>
                    </div>
                )}

            </Box>
            </div>
            <FooterMenu/>
        </div>
    );
};
export default MyWishList;
