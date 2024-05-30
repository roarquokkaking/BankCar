import React, { useState } from 'react';
import axios from 'axios';
import { Box } from "@mui/material";
import styles from './CSS/MyRating.module.css'; // CSS 모듈 사용 방식 유지
import Details from "./Details";
import FooterMenu from "../FooterMenu";

const MyRating = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 타이틀과 컨텐트 상태 업데이트 함수
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };




    //  제출 함수
    const handleSubmit = () => {
        // axios를 사용해 서버로 데이터를 전송
        axios.put('/api/posts', { title, content })
            .then(response => {
                console.log('Post saved successfully', response);
            })
            .catch(error => {
            });
    };

    return (
        <div>
            <Box>
                {/* 기존 컴포넌트 코드 */}
                <h3 style={{ textAlign: 'center' }}>후기 페이지</h3>
                <Details />
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
                    value={content}
                    onChange={handleContentChange}
                    placeholder="내용을 입력하세요."
                />
                <div className={styles.buttonDiv}>
                    <button className={styles.button}>사진 추가</button>
                    {/* 저장하기 버튼에 handleSubmit 함수 연결 */}
                    <button className={styles.button} onClick={handleSubmit}>저장하기</button>
                </div>
            </Box>
            <FooterMenu />
        </div>
    );
};

export default MyRating;
