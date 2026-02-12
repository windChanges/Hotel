import React, { useEffect, useState } from "react";
import { phongService } from "../../../services/phongService";
import { viTriService } from "../../../services/viTriService";
import RoomModal from "./RoomModal";
import UploadImageModal from "./UploadImageModal";

const RoomManagement = () => {
    const [rooms, setRooms] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [uploadRoomId, setUploadRoomId] = useState(null);

    useEffect(() => {
        fetchRooms();
        fetchLocations();
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await phongService.layDanhSachPhong();
            setRooms(response.data.content);
        } catch (error) {
            console.error("Error fetching rooms:", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await viTriService.layDanhSachViTri();
            setLocations(response.data.content);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await phongService.xoaPhong(id);
                fetchRooms();
            } catch (error) {
                console.error("Error deleting room:", error);
                alert("Failed to delete room.");
            }
        }
    };

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedRoom(null);
        setIsModalOpen(true);
    };

    const handleUploadImage = (id) => {
        setUploadRoomId(id);
        setIsUploadModalOpen(true);
    }

    const getLocationName = (maViTri) => {
        const location = locations.find(loc => loc.id === maViTri);
        return location ? location.tenViTri : maViTri;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Room Management
                </h2>
                <button
                    onClick={handleAdd}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                    Add New Room
                </button>
            </div>

            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Image</th>
                        <th scope="col" className="px-6 py-3">Room Name</th>
                        <th scope="col" className="px-6 py-3">Location</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Guests</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room) => (
                        <tr
                            key={room.id}
                            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                            <td className="px-6 py-4">{room.id}</td>
                            <td className="px-6 py-4">
                                <img src={room.hinhAnh} alt={room.tenPhong} className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {room.tenPhong}
                            </td>
                            <td className="px-6 py-4">{getLocationName(room.maViTri)}</td>
                            <td className="px-6 py-4">${room.giaTien}</td>
                            <td className="px-6 py-4">{room.khach}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button
                                    onClick={() => handleEdit(room)}
                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(room.id)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleUploadImage(room.id)}
                                    className="font-medium text-green-600 dark:text-green-500 hover:underline"
                                >
                                    Upload Img
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <RoomModal
                    isOpen={isModalOpen}
                    closeModal={() => setIsModalOpen(false)}
                    fetchRooms={fetchRooms}
                    room={selectedRoom}
                    locations={locations}
                />
            )}

            {isUploadModalOpen && (
                <UploadImageModal
                    isOpen={isUploadModalOpen}
                    closeModal={() => setIsUploadModalOpen(false)}
                    roomId={uploadRoomId}
                    fetchRooms={fetchRooms}
                />
            )}
        </div>
    );
};

export default RoomManagement;
