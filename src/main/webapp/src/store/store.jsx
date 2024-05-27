import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';


const store = configureStore({
    reducer:{
        Login:loginReducer
    }

});

export default store;