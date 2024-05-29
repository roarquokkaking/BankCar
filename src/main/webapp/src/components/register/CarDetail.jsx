import { Box, Button, Container, FormControl, FormHelperText, FormLabel, Input, MenuItem, Stack, TextField, Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import styles from'./css/CarDetail.module.css'

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
    justifyContent: "center",
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
    height: "100px"
  },
  "& .MuiButton-root": {
    marginTop: theme.spacing(3),
  },
}));

const CarDetail = () => {
     const [carModel, setCarModel] = useState("");
     const [manufactureYear, setManufactureYear] = useState("");
     const [color, setColor] = useState("");

     // 제조 연도 선택을 위한 옵션 배열 생성 (예시로 1990년부터 현재 연도까지)
     const years = Array.from(
       new Array(30),
       (val, index) => new Date().getFullYear() - index
     );

    return (
      <>
        <StyledContainer maxWidth="sm">
          <Typography variant="h4" gutterBottom>
            자동차 정보 입력
          </Typography>
          <StyledForm component="form">
            <FormControl>
              <FormLabel>자동차 모델명</FormLabel>
              <Input placeholder="자동차 모델명 입력" />
              <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
            <TextField
              select
              label="제조 연도"
              value={manufactureYear}
              onChange={(e) => setManufactureYear(e.target.value)}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
            <FormControl>
              <FormLabel>자동차 색상</FormLabel>
              <Input placeholder="색상 입력" />
              <FormHelperText>This is a helper text.</FormHelperText>
            </FormControl>
          </StyledForm>
        </StyledContainer>
      </>
    );
};

export default CarDetail;