import { api } from "@/services/apiClient";
import type { RegisterInput } from "../schemas/registerSchema";
import type { AuthResponse } from "../types/AuthTypes";

export async function registerRequest(
    data: RegisterInput
): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>("/users", data);
    return response.data;
}
