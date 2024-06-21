import React, {useEffect, useState} from 'react';
import { IoHeartSharp, IoHeartOutline } from "react-icons/io5";
import {GoArrowLeft} from "react-icons/go";
import {useNavigate} from "react-router-dom";
import Footer from "./Footer";
import FooterMenu from "./FooterMenu";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";
import axios from "axios";

const styles = {
    listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        marginRight: '40px',
        marginTop:'20px',
        border: 'solid 1px black',
        borderRadius: '15px',
        position: 'relative',
    },
    image: {
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
        color: '#DC143C', // 다홍색
        fontSize: '24px', // 아이콘 크기 조정
        cursor: 'pointer',
    },
    loadMoreButton: {
        display: 'block',
        margin: '20px auto',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius:'15px'
    },
};

const MyWishList = () => {
    const user_id = useSelector(state => state.Login.id);
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [wishListDTO, setWishListDTO] = useState([]);




    const fetchWishList = (page) => {
        if (!user_id) return; // user_id가 없을 경우 요청하지 않음
        console.log("userId = ", user_id)
        axios.get(`https://d/WishList/MyWishList/${user_id}?page=${page}&size=5`)
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



    const toggleFavorite = (id) => {
        axios.post(`http://localhost:8080/wishlist/toggle/${user_id}/${id}`)
            .then(response => {
                const updatedWishList = wishListDTO.map(item => {
                    if (item.id === id) {
                        return { ...item, isFavorite: response.data === 1 };
                    }
                    return item;
                });
                setWishListDTO(updatedWishList);
            })
            .catch(error => console.log(error));
    };
    console.log(wishListDTO)

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
                            <img src={item.imageUrl} alt={item.title} width="100" style={styles.image} />
                            <p style={styles.title}>{item.title}</p>
                            {item.isFavorite ? (
                                <IoHeartSharp
                                    style={item.favoriteIcon}
                                    onClick={() => toggleFavorite(item.id)}
                                />
                            ) : (
                                <IoHeartOutline
                                    style={item.favoriteIcon}
                                    onClick={() => toggleFavorite(item.id)}
                                />
                            )}
                        </li>
                    ))}
                </ul>
            </Box>
            {hasMore && (
                <button onClick={loadMore} style={styles.loadMoreButton}>더 보기</button>
            )}
            <FooterMenu />
        </div>
    );
};

export default MyWishList;
