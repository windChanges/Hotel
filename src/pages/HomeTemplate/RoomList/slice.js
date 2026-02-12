import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../services/api";
const initialState = {
  loading: false,
  data: null,
  error: null,
};

export const fetchListRoom = createAsyncThunk(
  "listRoom/fetchListRoom",
  async (__, { rejectWithValue }) => {
    try {
      const result = await api.get("phong-thue");
      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);



const listRoomSlice = createSlice({
  name: "listRoomSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //list room
    builder.addCase(fetchListRoom.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchListRoom.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchListRoom.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
export default listRoomSlice.reducer;