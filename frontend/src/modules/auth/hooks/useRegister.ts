import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";

import { registerSchema, RegisterInput } from "../schemas/registerSchema";
import { registerRequest } from "../api/register";
import type { AuthResponse } from "../types/AuthTypes";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState<string | null>(null);

    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
    });

    const handleRegister = async (
        data: RegisterInput
    ): Promise<AuthResponse | null> => {
        try {
            setLoading(true);
            setServerError(null);

            const response = await registerRequest(data);

            localStorage.setItem("token", response.token);

            return response;
        } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;

            const message =
                err.response?.data?.message ||
                "Não foi possível criar sua conta. Tente novamente.";

            setServerError(message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        handleRegister,
        loading,
        serverError,
    };
}
