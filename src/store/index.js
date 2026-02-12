import { configureStore } from "@reduxjs/toolkit";
import listRoomReducer from "./../pages/HomeTemplate/RoomList/slice"
import roomLocationReducer from "./../pages/HomeTemplate/RoomList/sliceLocation"
const store = configureStore({
    reducer:{
        //your reducers here
        listRoomReducer,
        roomLocationReducer,
    }
})

export default store;