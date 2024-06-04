import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { locations as cardLocations } from '../../data/mock-data';
import { Box as MuiBox } from '@mui/material';
import { carouselImage } from '../../themes/commonStyles';
import SwipeableViews from "react-swipeable-views-react-18-fix";

const LocationCardsChoice = () => {
    const [cards] = useState(cardLocations);
    const [activeStep, setActiveStep] = useState(0);

    if (!cards.length) {
        return null;
    }

    const locationImages = cards[0].locationImages;

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ mx: 2 }}>
            <Grid container>
                <Grid key={cards[0].id} item xs={12} sm={4} md={4} lg={3}>
                    <MuiBox sx={{ flexGrow: 1, position: 'relative' }}>
                        {locationImages.length && (
                            <SwipeableViews
                                axis="x"
                                index={activeStep}
                                onChangeIndex={handleStepChange}
                                enableMouseEvents
                            >
                                {locationImages.map((step, index) => (
                                    <div key={step.id}>
                                        <Box
                                            component="img"
                                            sx={carouselImage}
                                            src={step.url}
                                            alt={step.id}
                                        />
                                    </div>
                                ))}
                            </SwipeableViews>
                        )}
                    </MuiBox>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LocationCardsChoice;
