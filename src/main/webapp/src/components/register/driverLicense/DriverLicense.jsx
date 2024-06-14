import React from 'react';
import DriverHeader from './DriverHeader';
import DriverContent from './DriverContent';
import DriverFooter from './DriverFooter';
import './css/Main.css';
import { Box } from '@mui/material';
import FooterMenu from '../../FooterMenu';
import RegisterHeader from "../RegisterHeader";

const DriverLicense = () => {
    return (
        <>
            <RegisterHeader text={"운전면허증 등록"}/>
            <div className="App">
                <DriverHeader/>
                <DriverContent/>
                <DriverFooter/>
            </div>
        </>
    );
};

export default DriverLicense;