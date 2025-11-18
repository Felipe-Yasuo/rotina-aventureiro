import { api } from "@/services/apiClient";
import type { CreateRoutineInput } from "../schemas/createRoutineSchema";
import type { Routine } from "../types/RoutineTypes";

export async function createRoutineRequest(
    data: CreateRoutineInput
) {
    const response = await api.post<Routine>("/routines", data);
    return response.data;
}
