import React from "react";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// mui icons
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// 3rd party
import SwipeableViews from "react-swipeable-views-react-18-fix";

// react icons
import { AiFillStar } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
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

const CarouselCard = ({ location }) => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const maxSteps = location.locationImages.length; // so that we know how many dots

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1); // jumps when we click the next arrow
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1); // when we click the back arrow
  };

  const handleStepChange = (step) => {
    setActiveStep(step); // handle swipe change
  };

  const goChoice = () => {
    const url = `/choice?carid=${location.id}&startdate=${location.days}&enddate=${location.days}&price=${location.price}`;
    navigate(url);
  };

  return (
    <Box
      className="carouselCard"
      sx={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Box sx={fixedIcon}>
        <FaRegHeart size={24} color="#fff" />
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
