import { api } from "@/services/apiClient";
import type { CreateRoutineInput } from "../schemas/createRoutineSchema";
import { uploadImage } from "./uploadImage"; // 👈 FALTAVA

const xpMap = {
    EASY: 10,
    MEDIUM: 25,
    HARD: 50,
};

const moneyMap = {
    EASY: 5,
    MEDIUM: 10,
    HARD: 20,
};

export async function createRoutineRequest(data: CreateRoutineInput) {
    const imageUrl = await uploadImage(data.imageFile);

    const response = await api.post("/routines", {
        title: data.title,
        description: data.description,
        difficulty: data.difficulty,
        attributes: data.attributes,
        xpReward: xpMap[data.difficulty],
        moneyReward: moneyMap[data.difficulty],
        imageUrl,
    });

    return response.data;
}
