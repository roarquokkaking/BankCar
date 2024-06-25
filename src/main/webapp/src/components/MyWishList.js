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

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        marginRight: '40px',
        marginTop:'30px',
        border: 'solid 1px black',
        borderRadius: '15px',
        position: 'relative',
        height: '110p'
    },

    image: {
        border: '1px solid ,#ffff',
        borderRadius: '10px',
        marginTop: '10px',
        marginLeft: '10px',
        marginBottom: '10px',
        marginRight: '10px',
    },

    title: {
        marginLeft: '10px',
        marginTop: '-30px',
        flex: 1,
    },

    favoriteIcon: {
        position: 'absolute',
        right: '20px',
        bottom: '40px',
        color: '#f30404', // 다홍색
        fontSize: '30px', // 아이콘 크기 조정
        cursor: 'pointer',

    },
    IoIosArrowDown:{
        size:'10%',
        marginBottom : '15%'

    },
    IoHeartSharp:{
      marginRight:"5%"
    },
    isFavorite:{
      size : '20px',
    },
    loadMoreButton: {
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius:'15px',
        width:'100px',
        height:'45px'
    },
    Box:{
        marginTop: '10px',
        fontSize:'lazy'
    }
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
        axios.get(`https://dongwoossltest.shop/api/WishList/MyWishList/${user_id}?page=${page}&size=5`)
            .then(response => {
                console.log(response.data)
                const data = response.data || []; // response.data.wishList가 배열인지 확인
                if (data.length < 5) {
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

            <Box sx={{ pb: 7 }}>
                <header>
                    <div>
                        <GoArrowLeft
                            style={{
                                width: '30px',
                                height: '30px',
                                marginTop: '4%',
                                marginLeft: '20px',
                            }}
                            onClick={() => navigate(-1)}
                        />
                        <h1
                            style={{
                                textAlign: 'center',
                                font: 'apple SD Gothic Neo',
                                fontSize: '18px',
                                marginTop: '-9%',
                            }}
                        >Wish List</h1>
                    </div>
                </header>

                <ul>
                    {wishListDTO.map((item) => (
                        <li key={item.id} style={styles.listItem}>
                            <img src={`https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/cars/${item.imageUrl}`} alt={item.title} width="100" style={styles.image} />
                            <p style={styles.title}>{item.title}</p>
                            {item.isFavorite ? (
                                <IoHeartSharp
                                    style={item.favoriteIcon}
                                    onClick={() => toggleFavorite(item.id, item.carId)}
                                />
                            ) : (
                                <IoHeartOutline
                                    style={item.favoriteIcon}
                                    onClick={() => toggleFavorite(item.id, item.carId)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
                {hasMore && (
                    <IoIosArrowDown   onClick={loadMore} style={styles.loadMoreButton}더 보기/>
                )}
            </Box>

            <FooterMenu />
        </div>
    );
};
export default MyWishList;
