import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'login',

    initialState:{
        id:'',
        name:'',
        email:'',
        driver:'',
    },
    reducers:{
        setId:(state,action)=>{
            state.id= action.payload;
        },
        setEmail:(state,action)=>{
            state.email= action.payload;
        },
        setName:(state,action)=>{
            state.name= action.payload;
        },
        setDriver:(state,action)=>{
            state.driver= action.payload;
        }

    }
});

export const {setEmail,setId,setName,setDriver} = loginSlice.actions;
export default loginSlice.reducer;