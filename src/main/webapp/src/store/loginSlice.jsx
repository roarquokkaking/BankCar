import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name:'login',

    initialState:{
        id:'',
        name:'',
        email:''
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
        }

    }
});

export const {setEmail,setId,setName} = loginSlice.actions;
export default loginSlice.reducer;