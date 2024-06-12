import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'login',

    initialState:{
        id:'',
        name:'',
        email:'',
        driver:'',
        profile_image:''
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
        },
        setProfile_image:(state,action)=>{
            state.profile_image= action.payload;
        }
    }
});

export const {setEmail,setId,setName,setDriver,setProfile_image} = loginSlice.actions;
export default loginSlice.reducer;