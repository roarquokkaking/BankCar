import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Input, MenuItem, Stack, TextField, Typography, styled } from '@mui/material';
import React, {useContext, useState} from 'react';
import styles from './css/CarDetail.module.css'
import RegisterHeader from "./RegisterHeader";
import {RegisterContext} from "./RegisterContext";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "15px",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const StyledForm = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  borderRadius: "15px",
  alignItems: "center",
  "& .MuiTextField-root": {
    margin: theme.spacing(2),
    width: "300px",
  },
  "& .MuiButton-root": {
    marginTop: theme.spacing(3),
  },
}));

const ImageContainer = styled('div')(({ theme }) => ({
  width: '80%', // 이미지의 너비를 전체의 80%로 설정
  display: 'flex',
  justifyContent: 'center', // 이미지를 중앙에 배치
}));

const CarDetail = () => {
  const {data, onAddData} = useContext(RegisterContext);
  const [carModel, setCarModel] = useState(data.model);
  const [manufactureYear, setManufactureYear] = useState(data.released);
  const [color, setColor] = useState(data.color);


  // 제조 연도 선택을 위한 옵션 배열 생성 (예시로 1990년부터 현재 연도까지)
  const years = Array.from(
      new Array(30),
      (val, index) => new Date().getFullYear() - index
  );

  const onModel = (e) => {
    setCarModel(e.target.value);
    onAddData("model",e.target.value);
  }
  const onManufactureYear = (e) => {
    setManufactureYear(e.target.value);
    onAddData("released", e.target.value);
  }
  const onColor = (e) => {
    setColor(e.target.value);
    onAddData("color", e.target.value)
  }

  return (
      <>
        <RegisterHeader text={"자동차 정보 입력"} />
        <StyledContainer maxWidth="sm">
          <ImageContainer>
            <img src="/image/car4.png" alt="Car Image" style={{ width: '100%' }} />
          </ImageContainer>
          <StyledForm component="form">
            <TextField
                label="모델명"
                variant="outlined"
                value={carModel}
                onChange={onModel}
            />
            <TextField
                select
                label="제조 연도"
                value={manufactureYear}
                onChange={onManufactureYear}
            >
              {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
              ))}
            </TextField>
            <TextField
                label="색상"
                variant="outlined"
                value={color}
                onChange={onColor}
            />
          </StyledForm>
        </StyledContainer>
      </>
  );
};

export default CarDetail;
