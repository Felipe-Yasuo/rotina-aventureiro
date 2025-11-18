import { api } from "@/services/apiClient";

export async function completeRoutineRequest(routineId: string) {
    const response = await api.put("/routines/complete", { routineId });
    return response.data;
}
