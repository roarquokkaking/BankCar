import { createSlice } from "@reduxjs/toolkit";

export const optionSlice = createSlice({

    name:'option',

    initialState:{
        id:'0'
    },
    reducers:{
        setId:(state,action)=>{
            state.id= action.payload;
        }
    }
});

export const {setId} = optionSlice.actions;
export default optionSlice.reducer;