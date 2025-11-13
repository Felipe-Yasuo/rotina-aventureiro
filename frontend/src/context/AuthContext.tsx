"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { signInRequest, registerUser } from "@/services/auth";
import type { User } from "@/types/auth";


type AuthContextData = {
    user: User | null;
    token: string | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    signUp: (name: string, email: string, password: string) => Promise<void>;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Restaura sessão
    useEffect(() => {
        const t = localStorage.getItem("token");
        const u = localStorage.getItem("user");
        if (t && u) {
            setToken(t);
            try { setUser(JSON.parse(u)); } catch { }
        }
        setLoading(false);
    }, []);

    async function signIn(email: string, password: string) {
        const { token, user } = await signInRequest({ email, password });

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);


        router.push("/dashboard");
    }

    function signOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        window.location.href = "/login";
    }

    async function signUp(name: string, email: string, password: string) {
        const newUser = await registerUser({ name, email, password });
        await signIn(email, password);
        router.push("/dashboard");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                signIn,
                signOut,
                signUp,
                isAuthenticated: !!user && !!token,
            }
            }
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
