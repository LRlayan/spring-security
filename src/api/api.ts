import axios, {AxiosError} from "axios";
import Cookies from 'js-cookie';

export const api = axios.create({
    baseURL: "http://localhost:8080/api/v1/"
});

api.interceptors.request.use(
    (config: any) => {
        if (!config.url?.includes("/auth")) {
            const token = Cookies.get("jwtToken");

            if (token && config.url.includes("/auth/signIn")) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use((response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest.isRetry) {
            originalRequest.isRetry = true;

            const refreshToken = Cookies.get("refreshToken");

            if (refreshToken) {
                try {
                    const response = await api.post(
                        "auth/refreshToken",
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${refreshToken}`
                            }
                        }
                    );

                    const newAccessToken = response.data.refreshToken;
                    Cookies.set("jwtToken", newAccessToken, {
                        expires: 7,
                        sameSite: "lax"
                    });
                    return originalRequest;
                } catch (e) {
                    const error = e as AxiosError;
                    console.log("token refresh failed");
                    console.log("response error : ", error);

                    Cookies.remove("jwtToken");
                    Cookies.remove("refreshToken");

                    if (!error.response) {
                        console.error("No response from server!");
                        Cookies.remove("jwtToken");
                        Cookies.remove("refreshToken");
                        return;
                    }

                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        Cookies.remove("jwtToken");
                        Cookies.remove("refreshToken");
                    }
                }
            } else {
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("refreshToken");
            }
        }
        return Promise.reject(error);
    }
)