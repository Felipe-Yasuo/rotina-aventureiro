import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";

import { loginSchema, LoginInput } from "../schemas/loginSchema";
import { loginRequest } from "../api/login";
import type { AuthResponse } from "../types/AuthTypes";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const handleLogin = async (data: LoginInput): Promise<AuthResponse | null> => {
        try {
            setLoading(true);
            setServerError(null);

            const response = await loginRequest(data);

            localStorage.setItem("token", response.token);

            return response;
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;

            const message =
                err.response?.data?.message ||
                "Não foi possível realizar o login. Tente novamente.";

            setServerError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        handleLogin,
        loading,
        serverError,
    };
}
