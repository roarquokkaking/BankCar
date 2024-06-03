import React, {createContext, useState} from 'react';

export const RegisterContext = createContext();

/* 데이터 : 자동차 등록 카테고리, 자동차 상세 정보, 위치, 사진, 가격, 제목 및 설명
*
* data 객체 예시
* {
*   category : "캠핑",
*   model : "소나타",
*   released : "2023",
*   color : "흰색",
*   latitude : 12312341,
*   longitude : 13213423,
*   title : "제목입니다.",
*   content : "설명입니다."
* }
* 사진 객체
* image
* [
*   {id: 1, imageFile: "afdasdfasdfdf", selectImage: "afdsfasdfasd"},
*   {id: 2, imageFile: "afdasdfasdfdf", selectImage: "afdsfasdfasd"},
*   {id: 3, imageFile: "afdasdfasdfdf", selectImage: "afdsfasdfasd"},
*   {id: 4, imageFile: "afdasdfasdfdf", selectImage: "afdsfasdfasd"},
* ]
*  */
const RegisterProvider = ({children}) => {
    const [data, setData] = useState({
        category : "",
        model : "",
        released : "",
        color : "",
        latitude :  37.49807642572867,
        longitude : 127.02800593613699,
        price: 0,
        title : "",
        content : ""
    });
    const [imageFiles, setImageFiles] = useState([]);   // 이미지 파일 객체
    const [selectImages, setSelectImages] = useState([]);
    const onAddData = (target, value) => {
        setData({...data, [target] : value})
    }
    const onAddImageFile = (files) => {
        setImageFiles(files)
    }

    const onAddSelectImages = (imageUrls) => {
        setSelectImages(imageUrls);
    }


    return (
        <RegisterContext.Provider value={{data, selectImages, onAddData, onAddImageFile, onAddSelectImages}}>
            {children}
        </RegisterContext.Provider>
    );
};

export default RegisterProvider;