"use client";

import { createContext, useEffect, useState, ReactNode } from "react";
import { api } from "@/services/apiClient";
import type { AuthResponse } from "@/modules/auth/types/AuthTypes";

interface AuthContextProps {
    user: AuthResponse["user"] | null;
    loading: boolean;
    login: (data: { email: string; password: string }) => Promise<boolean>;
    register: (data: { name: string; email: string; password: string }) => Promise<boolean>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    login: async () => false,
    register: async () => false,
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<AuthResponse["user"] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        api.get("/me")
            .then((res) => {
                setUser(res.data.user);
            })
            .catch(() => {
                localStorage.removeItem("token");
            })
            .finally(() => setLoading(false));
    }, []);

    const login = async (data: { email: string; password: string }) => {
        try {
            const response = await api.post<AuthResponse>("/session", data);

            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);

            return true;
        } catch {
            return false;
        }
    };

    const register = async (data: { name: string; email: string; password: string }) => {
        try {
            const response = await api.post<AuthResponse>("/users", data);

            localStorage.setItem("token", response.data.token);
            setUser(response.data.user);

            return true;
        } catch {
            return false;
        }
    };


    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
