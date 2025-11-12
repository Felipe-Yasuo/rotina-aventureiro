export interface User {
    id: string;
    name: string;
    email: string;
    xp: number;
    money: number;
    level: number;
}

export interface AuthResponse {
    token: string;
    user: User;
}
