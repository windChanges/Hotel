import React from "react";
import { useEffect } from "react";
import { fetchListRoom } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import Room from "./Room";
const RoomList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.listRoomReducer);

  useEffect(() => {
    dispatch(fetchListRoom());
  }, []);

  const renderListRoom = () => {
    const { data } = state;
    return data?.map((room) => <Room key={room.id} data={room}></Room>);
  };
  console.log(state);
  if (state.loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {renderListRoom()}
    </div>
  );
};

export default RoomList;
