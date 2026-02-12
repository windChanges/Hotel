import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchLocationById } from "./sliceLocation";
import {useDispatch,useSelector} from "react-redux";
const Room = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const state = useSelector((state)=>state.roomLocationReducer);
  useEffect(()=>{
    dispatch(fetchLocationById(data.maViTri))
  })
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-md
                 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={data.hinhAnh}
          alt={data.tenPhong}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {data.tenPhong}
        </h3>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            👤 <span className="font-medium">{data.khach}</span> khách
          </p>
          <p>
            🛏 <span className="font-medium">{data.phongNgu}</span> phòng ngủ
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <p className="text-lg font-bold text-rose-500">
            ${data.giaTien}
            <span className="text-sm font-normal text-gray-500"> / đêm</span>
          </p>

          <Link 
          to={`/detail-room/${data.id}`}
          >
            <button
              className="px-4 py-2 text-sm rounded-lg
                       bg-rose-500 text-white
                       hover:bg-rose-600 transition"
            >
              Đặt phòng
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;
