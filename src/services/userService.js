import api from "./api";

export const userService = {
    // Lấy danh sách người dùng
    layDanhSachNguoiDung: () => {
        return api.get("/users");
    },

    // Thêm người dùng (ADMIN)
    themNguoiDung: (data) => {
        return api.post("/users", data);
    },

    // Xóa người dùng (ADMIN)
    xoaNguoiDung: (id) => {
        return api.delete(`/users?id=${id}`);
    },

    // Cập nhật người dùng
    capNhatNguoiDung: (id, data) => {
        return api.put(`/users/${id}`, data);
    },

    // Tìm kiếm người dùng
    timKiemNguoiDung: (tenNguoiDung) => {
        return api.get(`/users/search/${tenNguoiDung}`);
    }
};
