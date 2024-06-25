import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// 3rd party
import SwipeableViews from "react-swipeable-views-react-18-fix";

// react icons
import { AiFillStar } from "react-icons/ai";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  flexBetween,
  dFlex,
  carouselDot,
  fixedIcon,
  carouselImage,
  fixedBottom,
} from "../themes/commonStyles";
import "./CarouselCard.css";
import { useNavigate } from "react-router-dom";

const CarouselCard = ({ searchDTO, location, isHeartClick, onHeartClick, like }) => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);
  const [isHeartClicked, setIsHeartClicked] = useState(isHeartClick); // 하트 상태 초기화
  const maxSteps = location.locationImages.length; // so that we know how many dots

  // useEffect(() => {
  //   setIsHeartClicked(isHeartClick);
  // }, [isHeartClick]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };

  const handleHeartClick = () => {
    setIsHeartClicked((prev) => !prev);
    onHeartClick();
  };

  const goChoice = () => {
    if (searchDTO.startDate === '' || searchDTO.endDate === '' || searchDTO.startTime === '' || searchDTO.endTime === '' ){
          Swal.fire({
              icon: "error",
              title: "검색이 안되어 있습니다.",
              text: "검색을 먼저 해주세요!",
              customClass: {
                  container: 'my-swal-container-class',
                  title: 'my-swal-title-class',
                  content: 'my-swal-content-class',
                  confirmButton: 'my-swal-confirm-button-class',
                  body: 'my-swal-body'
              }
          });
    }
    else {
      const priceValue = parseInt(location.price.replace(/[^\d]/g, ''), 10);
      const url = `/choice?carid=${location.car_id}&startdate=${searchDTO.startDate}&`+
          `enddate=${searchDTO.endDate}&starttime=${searchDTO.startTime}&endtime=${searchDTO.endTime}&price=${priceValue}`;
      navigate(url);
    }
  };

  useEffect(() => {
    for(let i=0;i<like.length;i++){
        if(like[i] === location.car_id){
            setIsHeartClicked((prev) => !prev);
        }
    }
  },[])

  return (
      <Box
          className="carouselCard"
          sx={{
            flexGrow: 1,
            position: "relative",
          }}
      >
        <Box sx={fixedIcon} onClick={handleHeartClick}>
          {isHeartClicked ? (
              <FaHeart size={24} color="red" />
          ) : (
              <FaRegHeart size={24} color="#fff" />
          )}
        </Box>

        {location.locationImages.length && (
            <SwipeableViews
                axis={"x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
              {location.locationImages.map((step, index) => {
                return (
                    <div key={step.id}>
                      <Box
                          component="img"
                          sx={carouselImage}
                          src={step.url}
                          alt={step.id}
                          onClick={goChoice}
                      ></Box>
                    </div>
                );
              })}
            </SwipeableViews>
        )}

        <Box sx={fixedBottom}>
          <MobileStepper
              sx={{ backgroundColor: "transparent" }}
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                    size="small"
                    sx={carouselDot}
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                >
                  <KeyboardArrowRight />
                </Button>
              }
              backButton={
                <Button
                    size="small"
                    sx={carouselDot}
                    onClick={handleBack}
                    disabled={activeStep === 0}
                >
                  <KeyboardArrowLeft />
                </Button>
              }
          />
        </Box>

        <Box sx={flexBetween}>
          <Box sx={{ mt: 2 }} onClick={goChoice}>
            <Typography component="h3"> {location.location}</Typography>
            <Typography component="h4"> {location.days}</Typography>
            <Typography component="h5"> {location.price}</Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Box sx={dFlex}>
              {location.isNew ? (
                  <React.Fragment>
                    <Typography component="h5">New</Typography>
                    <AiFillStar size={18} />
                  </React.Fragment>
              ) : (
                  <React.Fragment>
                    <Typography component="h5"> {location.rating}</Typography>
                    <AiFillStar size={18} />
                  </React.Fragment>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
  );
};

export default CarouselCard;
