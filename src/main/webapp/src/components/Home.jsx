import {Box, Button, Container, createTheme, styled} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React from 'react';
import Header from './Header';
import OptionsTab from './OptionsTab';
import LocationCards from './choice/LocationCards';
import MobileFooter from './MobileFooter';
import FooterMenu from "./FooterMenu";

const Home = () => {

    const SearchBtn = styled(Button)(({theme}) => ({
        backgroundColor: "#ffffff", // 흰색 배경
        color: 'black',
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // 그림자
        borderRadius: "20px", // 둥근 모서리
        margin: theme.spacing(2, 2),
        padding: theme.spacing(1, 3), // 패딩
        "&:active": {
            backgroundColor: "#f0f0f0", // 호버 시 약간의 색 변화
        },
    }));


    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "90vh", // 전체 높이를 뷰포트 높이로 설정
                }}
            >
                {/* <Header /> */}
                <SearchBtn variant="contained">
                    <SearchIcon/>
                    검색하기
                </SearchBtn>
                <OptionsTab/>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        overflowY: "scroll",
                    }}
                >
                    <Container maxWidth="xl" sx={{mb: 3}}>
                        <LocationCards/>
                        <Box
                            sx={{
                                display: {xs: "flex", md: "none"},
                            }}
                        >
                            <MobileFooter/>
                        </Box>
                    </Container>
                </Box>
            </Box>
            <Box sx={{display: {xs: "flex", md: "none"}, marginTop: "auto"}}>
                <FooterMenu/>
            </Box>
        </>
    );
};

export default Home;