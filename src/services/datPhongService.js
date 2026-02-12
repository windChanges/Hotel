import api from "./api";

export const datPhongService = {
    // Lấy danh sách đặt phòng
    layDanhSachDatPhong: () => {
        return api.get("/dat-phong");
    },

    // Đặt phòng
    datPhong: (data) => {
        return api.post("/dat-phong", data);
    },

    // Lấy chi tiết đặt phòng
    layChiTietDatPhong: (id) => {
        return api.get(`/dat-phong/${id}`);
    },

    // Lấy theo người dùng
    layTheoNguoiDung: (maNguoiDung) => {
        return api.get(`/dat-phong/lay-theo-nguoi-dung/${maNguoiDung}`);
    }
};
