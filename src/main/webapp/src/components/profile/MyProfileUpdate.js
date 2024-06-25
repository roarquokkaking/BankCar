import React, {useEffect, useRef, useState} from 'react';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LuSmartphone } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoArrowLeft } from 'react-icons/go';
import {Link, useNavigate, useParams} from 'react-router-dom';
import styles from './CSS/MyProfile.module.css';
import axios from "axios";
import Box from "@mui/material/Box";
import FooterMenu from "../FooterMenu";
import {useSelector} from "react-redux";
import myProfileUpdate from "./MyProfileUpdate";



const MyProfileUpdate = () => {
    const navigate = useNavigate(); // 페이지 네비게이션 함수
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 상태
    const fileInputRef = useRef();
    const{user_id}=useParams()

    console.log(user_id)
    const handleIconClick = () => {
        fileInputRef.current.click(); // file input 클릭 이벤트 발생
    };

    //dto 설정
    const [UserProfileDTO, setUserProfileDTO] = useState({
        image_profile_name: "",
        image_original_name: "",
        name: "",
        phone_number: "",
        email: "",
        driver: "",
        user_id:"",
        imageUrl : "imageUrl",
    });

    //실행시 처음으로 이미지 갖고오게 만들어주는 axios
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response =
                    await axios.get(`https://dongwoossltest.shop/api/profile/myprofileUpdate/${user_id}`);
                setUserProfileDTO(response.data);
            } catch (error) {
                console.error("프로필 정보를 가져오는데 실패했습니다.", error);
            }
        };
        fetchUserProfile();
    }, [user_id]);



    const ImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // 네이버 클라우드에 이미지
            uploadImageToNaverCloud(file).then(imageUrl => {
                setProfileImage(imageUrl);
            });
        }
    };
    console.log(setUserProfileDTO)
    console.log(user_id)

    const [imageUrl, setImageUrl] = useState("");
    const uploadImageToNaverCloud = async (image) => {
        const formData = new FormData();
        formData.append('UserProfileDTO',new Blob([JSON.stringify(UserProfileDTO)],{type:'application/json'}))
        formData.append('image', image);
        try {
            const response = await axios.post(`https://localhost:8080/profile/profileUpdate/${user_id}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.imageUrl;
        } catch (error) {
            console.error("이미지 업로드 중 오류 발생:", error);
            return null;
        }
    };


    const inputhandle = (e) => {
        const { name, value } = e.target;
        setUserProfileDTO(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSaveClick = async () => {
        try {

            await axios.post(`http://localhost:8080/profile/updateProfile/${user_id}`,UserProfileDTO);
            alert('프로필이 성공적으로 저장되었습니다.');
            navigate('/profile'); // 프로필 페이지로 이동
        } catch (error) {
            console.error("프로필 저장 중 오류 발생:", error);
        }
    };
    console.log(profileImage)


    return (
        <div>
            {/*뒤로가기 버튼 */}
            <Box>
                <div className={styles.header}>
                    <GoArrowLeft
                        className={styles.backArrow}
                        onClick={() => navigate(-1)}
                    />
                </div>
                {/*제목 */}
                {/*<h1 className={styles.title}>프로필 수정</h1>*/}

                <div className={styles.buttonDiv}>
                    <button className={styles.button} onClick={handleIconClick}>
                        {UserProfileDTO.imageUrl ? (
                            <img src={UserProfileDTO.imageUrl}
                                 alt="Profile"
                                 className={styles.profileImage}/>
                        ) : (
                            <CgProfile className={styles.icon}/>
                        )}
                    </button>
                </div>

                {/* 이미지 업로드 입력 필드 */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={ImageChange}
                    className={styles.imageInput}
                    ref={fileInputRef}
                    hidden={true}
                />


                <div className={styles.formContainer}>
                    {/* 이름 입력 폼 그룹 */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MdOutlineDriveFileRenameOutline className={styles.iconLabel}/>
                            이름
                        </label>
                        <input type="text"
                               name="name"
                               className={styles.input}
                               value={UserProfileDTO.name}
                               onChange={inputhandle}
                        />
                    </div>
                    {/* 핸드폰 번호 입력 폼 그룹 */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <LuSmartphone className={styles.iconLabel}/>
                            핸드폰 번호
                        </label>
                        <input type="text"
                               name="phone"
                               className={styles.input}
                               value={UserProfileDTO.phone}
                               onChange={inputhandle}
                        />
                    </div>

                    {/* 이메일 입력 폼 그룹 */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MdEmail className={styles.iconLabel}/>
                            이메일
                        </label>
                        <input type="text"
                               name="email"
                               className={styles.input}
                               value={UserProfileDTO.email}
                               onChange={inputhandle}
                        />
                    </div>

                    {/* 면허증 입력 폼 그룹 */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaAddressCard className={styles.iconLabel}/>
                            면허증
                        </label>
                        <input type="text"
                               name="driver"
                               className={styles.input}
                               value={UserProfileDTO.driver}
                               onChange={inputhandle}
                        />
                    </div>

                    {/* 수정하기 버튼 */}
                    <div className={styles.submitButtonContainer}>
                        <button className={styles.submitButton}
                                onClick={handleSaveClick}>
                            저장 하기
                        </button>
                    </div>
                </div>
            </Box>
            <FooterMenu/>
        </div>
    );
};

export default MyProfileUpdate;
