import api from "./api";

export const authService = {
    signin: (credentials) => {
        return api.post("/auth/signin", credentials);
    },
    signup: (userInfo) => {
        return api.post("/auth/signup", userInfo);
    },
};
