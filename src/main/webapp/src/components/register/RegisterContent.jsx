import React, {useContext, useState} from 'react';
import RegisterHeader from "./RegisterHeader";
import styles from "./css/RegisterContent.module.css"
import {RegisterContext} from "./RegisterContext";

const RegisterContent = () => {
    const {data, onAddData} = useContext(RegisterContext);
    // 상태를 사용하여 입력된 글자 수를 관리합니다.
    const [title, setTitle] = useState(data.title);
    const [description, setDescription] = useState(data.content);

    // 입력 가능한 최대 글자 수를 정의합니다.
    const maxTitleLength = 50;
    const maxDescriptionLength = 300;

    const onTitle = (e) => {
        setTitle(e.target.value)
        onAddData("title", e.target.value)
    }

    const onDescription = (e) => {
        setDescription(e.target.value)
        onAddData("content", e.target.value)
    }

    return (
        <>
            <RegisterHeader text={"상품 내용 입력"}/>
            <div className={styles.content}>
                <h3>당신의 상품을 한 문장으로 표현해보세요.</h3>
                <textarea
                    className={styles.roundedInput}
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={onTitle}
                    maxLength={maxTitleLength} // 입력 가능한 최대 글자 수를 제한합니다.
                ></textarea>
                <div>{title.length}/{maxTitleLength}</div> {/* 현재 입력된 글자 수/최대 글자 수를 표시합니다. */}

                <h3>구매자가 알아야 할 모든 것, 여기에 담아보세요</h3>
                <textarea
                    className={styles.roundedInput + ' ' + styles.large} // 추가적인 클래스를 적용하여 크기를 조정합니다.
                    placeholder="상품 설명을 입력하세요"
                    value={description}
                    onChange={onDescription}
                    maxLength={maxDescriptionLength}
                ></textarea>
                <div>{description.length}/{maxDescriptionLength}</div>
            </div>
        </>
    );
};

export default RegisterContent;
