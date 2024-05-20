import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
// react icons
import { FaCarSide } from 'react-icons/fa';
import { flexCenter } from '../themes/commonStyles';
import { cyan, pink, yellow } from '@mui/material/colors';

const Logo = () => {
  return (
    <Box sx={flexCenter}>
      <FaCarSide size={40} color={cyan[500]} />
      <Typography
        sx={{
          ml: 1,
          color: (theme) => theme.palette.secondary.main,
          fontSize: '20px',
          fontWeight: 'bold',
        }}
        component="h3"
      >
        BankCar
      </Typography>
    </Box>
  );
};

export default Logo;