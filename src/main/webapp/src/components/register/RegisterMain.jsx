import React, { useState } from "react";
import {Button, MobileStepper } from "@mui/material";
import { useTheme } from "@emotion/react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CarDetail from "./CarDetail";
import CarLocation from "./CarLocation";
import CarPhoto from "./CarPhoto";
import RegisterDescription from "./RegisterDescription";
import Category from "./Category";
import PriceSetting from "./PriceSetting";
import RegisterContent from "./RegisterContent";
import RegisterProvider from "./RegisterContext";
import {RegisterPublish} from "./RegisterPublish";

const RegisterMain = () => {
  const [seq, setSeq] = useState(1);

  const seqData = [
    { id: 1, component: <RegisterDescription /> },
    { id: 2, component: <Category /> },
    { id: 3, component: <CarDetail /> },
    { id: 4, component: <CarLocation /> },
    { id: 5, component: <CarPhoto /> },
    { id: 6, component: <PriceSetting /> },
    { id: 7, component: <RegisterContent /> },
    { id: 8, component: <RegisterPublish /> },
  ];

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setSeq(seq + 1);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setSeq(seq - 1);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <RegisterProvider>
        {seqData.map((item) => (item.id === seq ? item.component : null))}
      </RegisterProvider>
      <MobileStepper
        variant="progress"
        steps={8}
        position="fixed"
        activeStep={activeStep}
        sx={{ maxWidth: '100%',
          flexGrow: 1,
          position: 'fixed',
          bottom: 0, // 하단에 고정
          width: '100%', // 너비를 100%로 설정하여 전체 화면 너비를 차지하도록 함
          zIndex: 1000 // 다른 요소들 위에 표시되도록 zIndex 설정
           }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 7}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
};

export default RegisterMain;
