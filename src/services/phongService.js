import api from "./api";

export const phongService = {
    // Lấy danh sách phòng
    layDanhSachPhong: () => {
        return api.get("/phong-thue");
    },

    // Lấy chi tiết phòng
    layThongTinPhong: (id) => {
        return api.get(`/phong-thue/${id}`);
    },

    // Lấy phòng theo vị trí
    layPhongTheoViTri: (maViTri) => {
        return api.get(`/phong-thue/lay-phong-theo-vi-tri?maViTri=${maViTri}`);
    },

    // Thêm phòng (ADMIN)
    themPhong: (data) => {
        return api.post("/phong-thue", data);
    },

    // Cập nhật phòng (ADMIN)
    capNhatPhong: (id, data) => {
        return api.put(`/phong-thue/${id}`, data);
    },

    // Xóa phòng (ADMIN)
    xoaPhong: (id) => {
        return api.delete(`/phong-thue/${id}`);
    },

    // Upload hình phòng (ADMIN)
    uploadHinhPhong: (maPhong, formData) => {
        return api.post(`/phong-thue/upload-hinh-phong?maPhong=${maPhong}`, formData);
    }
};
