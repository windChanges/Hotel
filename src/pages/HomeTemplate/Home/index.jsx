import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { phongService } from "../../../services/phongService";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await phongService.layDanhSachPhong();
        setRooms(response.data.content);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <Link to={`/detail-room/${room.id}`}>
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={room.hinhAnh}
                  alt={room.tenPhong}
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/300'; }}
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-gray-900 truncate flex-1 pr-2">{room.tenPhong}</h3>
                  <div className="flex items-center space-x-1">
                    <svg className="w-3 h-3 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <span className="text-sm font-light">4.8</span>
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">{room.khach} guests · {room.phongNgu} bedrooms</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-semibold text-gray-900">${room.giaTien}</span>
                  <span className="text-gray-500 font-light text-sm">night</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;