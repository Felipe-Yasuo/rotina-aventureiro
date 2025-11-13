export interface Routine {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    xpReward: number;
    moneyReward: number;
    completed: boolean;
    createdAt?: string;
}

export interface CreateRoutineDTO {
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    xpReward: number;
    moneyReward: number;
}
