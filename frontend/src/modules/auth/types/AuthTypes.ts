// Resposta de login vinda do backend
export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;

        xp: number;
        level: number;
        money: number;

        streak: number;
        lives: number;
        lastStreakAt: string | null;

        strength: number;
        intelligence: number;
        creativity: number;
        charisma: number;
        health: number;
    };
}
