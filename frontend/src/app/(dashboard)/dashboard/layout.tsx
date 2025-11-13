"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { user, signOut } = useAuth();

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
            <header className="bg-gray-900 px-6 py-4 flex justify-between items-center border-b border-gray-800">
                <h1 className="text-xl font-bold text-green-400">Rotina Aventureiro ⚔️</h1>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">{user?.name}</span>
                    <button
                        onClick={signOut}
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
                    >
                        Sair
                    </button>
                </div>
            </header>

            <main className="flex-1 px-6 py-8">{children}</main>
        </div>
    );
}
