import { api } from "@/services/apiClient";
import type { LoginInput } from "../schemas/loginSchema";
import type { AuthResponse } from "../types/AuthTypes";

export async function loginRequest(data: LoginInput): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/session", data);
    return response.data;
}
