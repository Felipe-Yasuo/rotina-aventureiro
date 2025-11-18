export interface RoutineAttribute {
    id: string;
    type: "STRENGTH" | "INTELLIGENCE" | "CHARISMA" | "CREATIVITY" | "HEALTH";
}

export interface Routine {
    id: string;
    title: string;
    description?: string | null;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    imageUrl: string;
    completed: boolean;
    xpReward: number;
    moneyReward: number;
    attributes: RoutineAttribute[];
    createdAt: string;
}
