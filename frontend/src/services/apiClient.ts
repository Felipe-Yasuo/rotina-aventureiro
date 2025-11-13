import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333",
    withCredentials: false,
});

// Adiciona token automaticamente
api.interceptors.request.use((config) => {
    const token = typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


// Interceptor de erro global
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // desconecta usuário automaticamente
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);
