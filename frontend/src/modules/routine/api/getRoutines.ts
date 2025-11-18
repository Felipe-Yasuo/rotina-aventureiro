import { api } from "@/services/apiClient";
import type { Routine } from "../types/RoutineTypes";

export async function getRoutines() {
    const response = await api.get<{
        routines: Routine[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>("/routines");

    return response.data;
}
