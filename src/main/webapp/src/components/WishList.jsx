import React from 'react';
import {Box} from "@mui/material";
import FooterMenu from "./FooterMenu";

const styles = {
    container: {
        marginLeft: 30
    },
    header: {
        marginLeft: 20,
        color: "pink"
    },
    mediumText: {
        fontSize: "medium"
    },
    smallText: {
        fontSize: "small",
        marginTop: "100px",
        fontWeight: 100  // 글씨를 얇게 설정
    },
    button: {
        marginTop: "20px",
        width: "70px",
        height: "30px",
        color: "white",
        backgroundColor: "#3399d9",
        borderRadius: "10px",
        border: "none"  // 검은 색 테두리 제거
    }
};

const Wishlist = () => {
    return (
        <>

            <div style={styles.container}>
                <h1 style={styles.header}>위시리스트</h1>
                <div>
                    <span style={styles.mediumText}>위시리스트를 확인하려면</span><br/>
                    <span>로그인후 이용하세요</span><br/>
                    <span style={styles.smallText}>
                    로그인한 후 위시리스트를 생성 및 조회, <br/>수정할 수 있습니다.
                </span>
                </div>
                <button style={styles.button}>로그인</button>
            </div>
            <Box sx={{display: {xs: "flex", md: "none"}, marginTop: "auto"}}>
                <FooterMenu/>
            </Box>
        </>
    );
}

export default Wishlist;
