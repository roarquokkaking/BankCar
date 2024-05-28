import React from 'react';
import DriverHeader from './DriverHeader';
import DriverContent from './DriverContent';
import DriverFooter from './DriverFooter';
import './css/Main.css';

const DriverLicense = () => {
    return (
        <div className="App">
      <DriverHeader />
      <DriverContent />
      <DriverFooter />
    </div>
    );
};

export default DriverLicense;