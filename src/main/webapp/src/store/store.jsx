import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginReducer from './loginSlice';
import optionReducer from './optionSlice';


// persist 설정
const persistConfig = {
    key: 'root',
    storage,
  };
  
  // 개별 리듀서에 persist를 적용
  const persistedLoginReducer = persistReducer(persistConfig, loginReducer);
  const persistedOptionReducer = persistReducer(persistConfig, optionReducer);

const store = configureStore({
    reducer:{
        Login:persistedLoginReducer,
        Option:persistedOptionReducer
    }

});
const persistor = persistStore(store);
export {store,persistor};