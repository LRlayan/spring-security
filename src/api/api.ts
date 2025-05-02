import axios from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/"
});

api.interceptors.request.use(
    (config: any) => {
        if (!config.url?.includes("/auth")) {
            const token = Cookies.get("jwtToken");
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);