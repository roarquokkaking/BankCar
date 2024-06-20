import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import optionReducer from './optionSlice';


const store = configureStore({
    reducer:{
        Login:loginReducer,
        Option:optionReducer
    }

});

export default store;