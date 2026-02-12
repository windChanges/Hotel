import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchLocationById = createAsyncThunk(
  "locationRoom/fetchLocationRoom",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`vi-tri/${id}`);
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocationById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLocationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default locationSlice.reducer;