import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import styles from "./css/CarPhoto.module.css";
import RegisterHeader from "./RegisterHeader";
import {useContext, useRef, useState} from "react";
import {RegisterContext} from "./RegisterContext";
import {Alert, AlertTitle} from "@mui/material";
import Stack from "@mui/material/Stack";

function srcset(image, size, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${size * cols}&h=${
            size * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
}

export default function CarPhoto() {
    const {selectImages, onAddImageFile, onAddSelectImages} = useContext(RegisterContext)
    const [file, setFile] = useState([]);
    const [selectImage, setSelectImage] = useState(selectImages);
    const fileInputRef = useRef();
    const [open, setOpen] = useState(false);

    const handleChange = (event) => {
        const selectedFile = event.target.files;

        console.log(selectedFile)
        if (selectedFile) {
            // FileList를 배열로 변환
            const imageUrls = Array.from(selectedFile).map((file) =>
                URL.createObjectURL(file)
            );
            setFile(event.target.files);
            setSelectImage(imageUrls); // 이미지 미리 볼려고
        }
    };

    const handleAddButton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
            setOpen(false)
        }
    }

    const isMobile = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
    };

    const handleAddData = () => {
        onAddImageFile(file);
        onAddSelectImages(selectImage)
        setOpen(true)
    }
    return (
        <>
            <RegisterHeader text={"자동차 사진 등록"}/>
            <div className={styles.photo}>
                <p>자동차의 <strong>전면, 후면, 측면</strong>을 포함하여 총 <strong>4장</strong>의 사진을 찍어 등록해 주세요.</p>
                <button onClick={handleAddButton}>{open ? "사진 재업로드" : "사진 업로드"}</button>
                <input
                    type="file"
                    accept="image/*"
                    capture={isMobile ? "camera" : undefined}
                    onChange={handleChange}
                    multiple="multiple"
                    hidden={true}
                    ref={fileInputRef}
                />

                <ImageList sx={{width: 350, height: 350}} cols={2} rowHeight={164}>
                    {selectImage.map((item) => (
                        <ImageListItem key={item.img}>
                            <img
                                src={item}
                                alt="선택한 파일"
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                {open ?
                    <Alert severity="success">
                        <AlertTitle>사진이 등록 되었습니다.</AlertTitle>
                    </Alert>
                    : <button style={{marginTop: "10px"}} onClick={handleAddData}>사진 등록</button>
                }


            </div>
        </>
    );
}
const itemData = [
    {
        img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
        title: "Breakfast",
    },
    {
        img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
        title: "Burger",
    },
    {
        img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        title: "Camera",
    },
    {
        img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
        title: "Coffee",
    },
    {
        img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        title: "Hats",
    },
    {
        img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        title: "Honey",
    },
    {
        img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        title: "Basketball",
    },
    {
        img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
        title: "Fern",
    },
    {
        img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
        title: "Mushrooms",
    },
    {
        img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
        title: "Tomato basil",
    },
    {
        img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        title: "Sea star",
    },
    {
        img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        title: "Bike",
    },
];