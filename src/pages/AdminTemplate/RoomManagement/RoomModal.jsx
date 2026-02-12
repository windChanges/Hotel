import React, { useEffect, useState } from "react";
import { phongService } from "../../../services/phongService";

const RoomModal = ({ isOpen, closeModal, fetchRooms, room, locations }) => {
    const [formData, setFormData] = useState({
        tenPhong: "",
        khach: 0,
        phongNgu: 0,
        giuong: 0,
        phongTam: 0,
        moTa: "",
        giaTien: 0,
        mayGiat: false,
        banLa: false,
        tivi: false,
        dieuHoa: false,
        wifi: false,
        bep: false,
        doXe: false,
        hoBoi: false,
        banUi: false,
        maViTri: 0,
        hinhAnh: "",
    });

    useEffect(() => {
        if (room) {
            setFormData(room);
        } else {
            // Reset form for add new
            setFormData({
                tenPhong: "",
                khach: 0,
                phongNgu: 0,
                giuong: 0,
                phongTam: 0,
                moTa: "",
                giaTien: 0,
                mayGiat: false,
                banLa: false,
                tivi: false,
                dieuHoa: false,
                wifi: false,
                bep: false,
                doXe: false,
                hoBoi: false,
                banUi: false,
                maViTri: locations.length > 0 ? locations[0].id : 0,
                hinhAnh: "",
            });
        }
    }, [room, locations]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (room) {
                await phongService.capNhatPhong(room.id, formData);
            } else {
                await phongService.themPhong(formData);
            }
            fetchRooms();
            closeModal();
        } catch (error) {
            console.error("Error saving room:", error);
            alert("Failed to save room.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-xs p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {room ? "Edit Room" : "Add New Room"}
                    </h3>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Room Name
                            </label>
                            <input
                                type="text"
                                name="tenPhong"
                                value={formData.tenPhong}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Location
                            </label>
                            <select
                                name="maViTri"
                                value={formData.maViTri}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            >
                                <option value={0}>Select Location</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.tenViTri}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                name="giaTien"
                                value={formData.giaTien}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Guests
                            </label>
                            <input
                                type="number"
                                name="khach"
                                value={formData.khach}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Bedrooms
                            </label>
                            <input
                                type="number"
                                name="phongNgu"
                                value={formData.phongNgu}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Beds
                            </label>
                            <input
                                type="number"
                                name="giuong"
                                value={formData.giuong}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Bathrooms
                            </label>
                            <input
                                type="number"
                                name="phongTam"
                                value={formData.phongTam}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                required
                            />
                        </div>


                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea name="moTa" rows="4" value={formData.moTa} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"></textarea>
                        </div>

                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amenities</label>
                            <div className="flex flex-wrap gap-4">
                                {['mayGiat', 'banLa', 'tivi', 'dieuHoa', 'wifi', 'bep', 'doXe', 'hoBoi', 'banUi'].map((item) => (
                                    <div key={item} className="flex items-center">
                                        <input id={item} type="checkbox" name={item} checked={formData[item]} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor={item} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 capitalize">{item.replace(/([A-Z])/g, ' $1').trim()}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {room ? "Update Room" : "Add Room"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RoomModal;
