import React, { useState } from 'react';
import axios from 'axios';
import { Box } from "@mui/material";
import styles from './CSS/MyRating.module.css'; // CSS 모듈 사용 방식 유지
import Details from "./Details";
import FooterMenu from "../FooterMenu";

const MyRating = () => {
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);

    const data = {
        title, comment, image
    }
    // 타이틀과 컨텐트 상태 업데이트 함수
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setComment(e.target.value);
    };

    // 제출 함수
    const handleSubmit = () => {
        // axios를 사용해 서버로 데이터를 전송
        axios.put('', { title, comment })
            .then(response => {
                const { title, comment } = response.data;
                console.log('Title:', title);
                console.log('Comment:', comment);
                // 상태 초기화
                setTitle('');
                setComment('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    // 이미지 파일 선택 핸들러
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <div>
            <Box>
                {/* 기존 컴포넌트 코드 */}
                <h3 style={{ textAlign: 'center' }}>후기 페이지</h3>
                <Details data={data}/>
                {/* 평점 관련 컴포넌트 코드 생략 */}

                {/* 타이틀 입력 */}
                <input
                    className={styles.inputTitle}
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="제목을 입력하세요."
                />
                {/* 컨텐트 입력 */}
                <textarea
                    className={styles.inputContext}
                    value={comment}
                    onChange={handleContentChange}
                    placeholder="내용을 입력하세요."
                />
                {/* 이미지 파일 선택 */}
                <input
                    type="file"
                    onChange={handleImageChange}
                />
                <div className={styles.buttonDiv}>
                    <button className={styles.button}>사진 추가</button>
                    <button className={styles.button} onClick={handleSubmit}>저장하기</button>
                </div>
            </Box>
            <FooterMenu />
        </div>
    );
};

export default MyRating;
