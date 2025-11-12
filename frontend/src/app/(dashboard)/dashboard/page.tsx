"use client";
import { useAuth } from "@/context/AuthContext";

export default function DashboardHome() {
    const { user, signOut } = useAuth();

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-2">Bem-vindo, {user?.name} 👋</h1>
            <p className="text-gray-300 mb-6">Nível {user?.level} · XP {user?.xp} · 💰 {user?.money}</p>

            <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 transition rounded-lg px-4 py-2"
            >
                Sair
            </button>
        </main>
    );
}
