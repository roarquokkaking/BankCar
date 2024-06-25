import React, { useEffect, useState } from 'react';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { LuSmartphone } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { GoArrowLeft } from 'react-icons/go';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Box from "@mui/material/Box";
import FooterMenu from "../FooterMenu";
import axios from "axios";
import styles from "./CSS/MyProfile.module.css";
import {useSelector} from "react-redux";

const MyProfile = () => {
    const defaultProfileImage = useSelector(state => state.Login.profile_image);
    const email = useSelector(state => state.Login.email)
    const navigate = useNavigate();
    const { user_id } = useParams();
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const [myprofileDTO, setprofileDTO] = useState({
        image_profile_name: "",
        image_original_name: "",
        imageUrl: '',
        name: "",
        phone_number: "",
        email: '',
        driver: "",
        user_id: user_id,
        image_file_name: ""
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`https://dongwoossltest.shop/api/profile/myprofile/${user_id}`); // URL 수정
                setprofileDTO(response.data);
            } catch (error) {
                console.error("프로필 정보를 가져오는데 실패했습니다.", error);
            }
        };
        fetchUserProfile();
    }, [user_id]);
    let image = 'https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/profile/';
    return (
        <div>
            <Box>
                <div className={styles.header}>
                    <GoArrowLeft
                        className={styles.backArrow}
                        onClick={() => navigate(-1)}
                    />
                </div>
                <h1 className={styles.title}>프로필</h1>
                <div className={styles.buttonDiv}>
                    <label htmlFor="profileImage" className={styles.button}>
                        <div style={{ width: '100px', height: '100px' }}>
                            {
                                myprofileDTO.image_file_name === null ?
                                    <img src={defaultProfileImage} alt="Profile" className={styles.profileImage} /> :
                                    <img src={image+myprofileDTO.imageUrl} alt="Profile" className={styles.profileImage} />
                            }
                        </div>
                    </label>
                    <input
                        type="file"
                        id="profileImage"
                        style={{ display: 'none' }}
                        hidden={true}
                    />
                </div>

                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MdOutlineDriveFileRenameOutline className={styles.iconLabel} />
                            이름
                        </label>
                        <input type="text"
                               className={styles.input}
                               value={myprofileDTO.name}
                               readOnly />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <LuSmartphone className={styles.iconLabel} />
                            핸드폰 번호
                        </label>
                        <input type="text"
                               className={styles.input}
                               value={myprofileDTO.phone_number}
                               readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MdEmail className={styles.iconLabel} />
                            이메일
                        </label>
                        <input type="text"
                               className={styles.input}
                               value={myprofileDTO.email}
                               readOnly />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaAddressCard className={styles.iconLabel} />
                            면허증
                        </label>
                        <input type="text"
                               className={styles.input}
                               value={myprofileDTO.driver}
                               readOnly />
                    </div>
                    <div className={styles.submitButtonContainer}>
                        <Link to={`/profile/myProfileUpdate/${user_id}`}>
                            <button type="button" className={styles.submitButton}>수정하기</button>
                        </Link>
                    </div>
                </div>
            </Box>
            <FooterMenu />
        </div>
    );
};

export default MyProfile;
