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

const MyProfile = () => {
    const navigate = useNavigate();
    const { user_id } = useParams();
    const [profileImage, setProfileImage] = useState(null);



    //객체 만들기
    const [myprofile, setMyprofile] = useState({
        image_profile_name: "",
        name: "",
        phoneNumber: "",
        email: "",
        driver: "",
    });



    //user_id 를 통해 정보 갖고오기
    useEffect(() => {
        let url = `http://localhost:8080/profile/myprofile?user_id=${user_id}`;
        axios.get(url)
            .then(response => {
                let profile = response.data;
                setMyprofile(profile);
                if (profile.image_profile_name) {
                    fetchProfileImage(profile.image_profile_name);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, [user_id]);



    //네이버 클라우드에서 정보 갖고오기
    const fetchProfileImage = (imageName) => {
        const imageUrl = `https://kr.object.ncloudstorage.com/bitcamp-6th-bucket-102/driverOCR/${imageName}`;
        axios.get(imageUrl, { responseType: 'blob' })
            .then(response => {
                const imageObjectURL = URL.createObjectURL(response.data);
                setProfileImage(imageObjectURL);
            })
            .catch(error => {
                console.log('Error fetching the image:', error);
            });
    };

    return (
        <div>
            <Box>
                <div className={styles.header}>
                    <GoArrowLeft
                        className={styles.backArrow}
                        onClick={() => navigate(-1)}
                    />
                </div>
                <h1 className={styles.title}>{myprofile.name}</h1>
                <div className={styles.buttonDiv}>
                    <button className={styles.button}>
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className={styles.profileImage} />
                        ) : (
                            <CgProfile className={styles.icon} />
                        )}
                    </button>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MdOutlineDriveFileRenameOutline className={styles.iconLabel} />
                            이름
                        </label>
                        <input type="text" className={styles.input} value={myprofile.name} onChange={e => setMyprofile({ ...myprofile, name: e.target.value })} />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <LuSmartphone className={styles.iconLabel} />
                            핸드폰 번호
                        </label>
                        <input type="text" className={styles.input} value={myprofile.phoneNumber} onChange={e => setMyprofile({ ...myprofile, phoneNumber: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <MdEmail className={styles.iconLabel} />
                            이메일
                        </label>
                        <input type="text" className={styles.input} value={myprofile.email} onChange={e => setMyprofile({ ...myprofile, email: e.target.value })} />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            <FaAddressCard className={styles.iconLabel} />
                            면허증
                        </label>
                        <input type="text" className={styles.input} value={myprofile.license} onChange={e => setMyprofile({ ...myprofile, license: e.target.value })} />
                    </div>
                    <div className={styles.submitButtonContainer}>
                        <Link to="/Profile/MyProfileUpdate">
                            <button className={styles.submitButton}>수정하기</button>
                        </Link>
                    </div>
                </div>
            </Box>
            <FooterMenu />
        </div>
    );
};

export default MyProfile;
