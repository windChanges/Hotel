import api from "./api";

export const viTriService = {
    layDanhSachViTri: () => {
        return api.get("/vi-tri");
    },
};
