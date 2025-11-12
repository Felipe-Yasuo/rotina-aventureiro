import { api } from "./api";
import type { AuthResponse, User } from "@/types/auth";

export async function registerUser(data: { name: string; email: string; password: string; }): Promise<User> {
    const res = await api.post<User>("/users", data);
    return res.data;
}

export async function signInRequest(data: { email: string; password: string; }): Promise<AuthResponse> {
    const res = await api.post<AuthResponse>("/session", data);
    return res.data;
}
