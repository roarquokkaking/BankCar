import {Box, Button, Container, createTheme, styled} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React from 'react';
import OptionsTab from './OptionsTab';
import LocationCards from './LocationCards';
import MobileFooter from './MobileFooter';
import FooterMenu from "./FooterMenu";
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
    // const location = useLocation();
    // const [searchData, setSearchData] = useState([]);

    // useEffect(() => {
    //     const searchParams = new URLSearchParams(location.search);
    //     const searchDTO = {
    //         startDate: searchParams.get('startDate') || '',
    //         endDate: searchParams.get('endDate') || '',
    //         startTime: searchParams.get('startTime') || '',
    //         endTime: searchParams.get('endTime') || '',
    //         jibunAddress: searchParams.get('jibunAddress') || '',
    //         roadAddress: searchParams.get('roadAddress') || '',
    //         x: searchParams.get('x') || '',
    //         y: searchParams.get('y') || '',
    //         minPrice: searchParams.get('minPrice') || '',
    //         maxPrice: searchParams.get('maxPrice') || ''
    //     };

    //     axios.post("http://localhost:8080/searching/searchList", null, { params: searchDTO })
    //         .then(res => {
    //             setSearchData(res.data);
    //         })
    //         .catch(error => console.log(error));
    // }, [location.search]);

    const goSearch = () => {
        navigate('/searching');
      };

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

    const location = useLocation();
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // URL 파라미터에서 검색 조건 추출
                const searchParams = new URLSearchParams(location.search);
                const searchDTO = {
                    startDate: searchParams.get('startDate') || '',
                    endDate: searchParams.get('endDate') || '',
                    startTime: searchParams.get('startTime') || '',
                    endTime: searchParams.get('endTime') || '',
                    jibunAddress: searchParams.get('jibunAddress') || '',
                    roadAddress: searchParams.get('roadAddress') || '',
                    x: searchParams.get('x') || '',
                    y: searchParams.get('y') || '',
                    minPrice: searchParams.get('minPrice') || '',
                    maxPrice: searchParams.get('maxPrice') || ''
                };

                // 검색 조건이 있는 경우에만 서버에 POST 요청
                if (searchDTO.startDate && searchDTO.endDate && searchDTO.startTime && searchDTO.endTime) {
                    const response = await axios.post("http://localhost:8080/searching/searchList", searchDTO);
                    setSearchData(response.data);
                } else {
                    setSearchData([]); // 검색 조건이 없으면 빈 배열 설정
                }
            } catch (error) {
                console.error('검색 오류', error);
            }
        };

        fetchLocations(); // 컴포넌트가 처음 마운트될 때 한 번 호출
    }, [location.search]);


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
                <SearchBtn variant="contained" onClick={goSearch}>
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