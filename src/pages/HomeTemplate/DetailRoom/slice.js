import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";
const initialState = {
    loading: false,
    data: null,
    error:null,    
};

export const fetchListDetailRoom = createAsyncThunk(
    "detailRoom/fetchDetailRoom",
    async(id,{rejectWithValue})=>{
        try{
            
        }
    }
)