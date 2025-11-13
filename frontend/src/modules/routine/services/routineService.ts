import { api } from "@/services/api";
import type { Routine, CreateRoutineDTO } from "../types";

export async function getUserRoutines() {
    const res = await api.get<Routine[]>("/routines");
    return res.data;
}

export async function createRoutine(data: CreateRoutineDTO) {
    const res = await api.post<Routine>("/routines", data);
    return res.data;
}
