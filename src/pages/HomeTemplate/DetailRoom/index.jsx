import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { phongService } from "../../../services/phongService";
import { datPhongService } from "../../../services/datPhongService";

const DetailRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking State
  const [bookingData, setBookingData] = useState({
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: 1,
    maPhong: id,
    maNguoiDung: 0,
  });

  useEffect(() => {
    const fetchRoomDetail = async () => {
      try {
        const response = await phongService.layThongTinPhong(id);
        setRoom(response.data.content);
      } catch (error) {
        console.error("Error fetching room detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomDetail();
  }, [id]);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const userStr = localStorage.getItem("USER_ADMIN");
    if (!userStr) {
      alert("Please login to book a room.");
      navigate("/auth/login");
      return;
    }

    const user = JSON.parse(userStr);
    // Assuming user.user.id is the User ID. 
    // Note: Check actual API response structure. Usually it's user.user.id or user.id
    const userId = user.user.id;

    if (!userId) {
      alert("User information invalid. Please login again.");
      return;
    }

    const payload = {
      ...bookingData,
      maNguoiDung: userId,
      maPhong: room.id,
      // Convert dates to ISO string if needed by API, or keep 'YYYY-MM-DD' depending on backend
      ngayDen: new Date(bookingData.ngayDen).toISOString(),
      ngayDi: new Date(bookingData.ngayDi).toISOString(),
    };

    try {
      await datPhongService.datPhong(payload);
      alert("Booking successful!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert(error.response?.data?.content || "Booking failed. Please check availability.");
    }
  }

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!room) return <div className="text-center py-10">Room not found.</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{room.tenPhong}</h1>
        <div className="flex items-center text-sm text-gray-500 underline">
          <span> Location ID: {room.maViTri}</span>
        </div>
      </div>

      {/* Image Grid - Simplified to single image for now */}
      <div className="rounded-xl overflow-hidden mb-8 max-h-[500px]">
        <img src={room.hinhAnh} alt={room.tenPhong} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/800x500'; }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-2">Room hosted by Owner</h2>
            <p className="text-gray-600">{room.khach} guests · {room.phongNgu} bedrooms · {room.giuong} beds · {room.phongTam} baths</p>
          </div>

          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{room.moTa}</p>
          </div>

          <div className="border-b pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-2 gap-4">
              {room.mayGiat && <div className="flex items-center gap-2"><span>🧺</span> Washing machine</div>}
              {room.banLa && <div className="flex items-center gap-2"><span>👕</span> Iron</div>}
              {room.tivi && <div className="flex items-center gap-2"><span>📺</span> TV</div>}
              {room.dieuHoa && <div className="flex items-center gap-2"><span>❄️</span> Air conditioning</div>}
              {room.wifi && <div className="flex items-center gap-2"><span>📶</span> Wifi</div>}
              {room.bep && <div className="flex items-center gap-2"><span>🍳</span> Kitchen</div>}
              {room.doXe && <div className="flex items-center gap-2"><span>🚗</span> Parking</div>}
              {room.hoBoi && <div className="flex items-center gap-2"><span>🏊</span> Pool</div>}
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <div className="md:col-span-1">
          <div className="border rounded-xl shadow-xl p-6 sticky top-24 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div><span className="text-xl font-bold">${room.giaTien}</span> <span className="text-gray-500">night</span></div>
              <div className="flex items-center text-sm"><span className="font-bold">★ 4.8</span></div>
            </div>

            <form onSubmit={handleBookingSubmit} className="grid grid-cols-2 gap-2 mb-4">
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Check-in</label>
                <input type="date" name="ngayDen" required onChange={handleBookingChange} className="w-full border rounded p-2 text-sm" />
              </div>
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Check-out</label>
                <input type="date" name="ngayDi" required onChange={handleBookingChange} className="w-full border rounded p-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Guests</label>
                <input type="number" name="soLuongKhach" min="1" max={room.khach} defaultValue="1" onChange={handleBookingChange} className="w-full border rounded p-2 text-sm" />
              </div>

              <button type="submit" className="col-span-2 mt-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg transition-colors">
                Reserve
              </button>
              <p className="col-span-2 text-center text-xs text-gray-500 mt-2">You won't be charged yet</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRoom;