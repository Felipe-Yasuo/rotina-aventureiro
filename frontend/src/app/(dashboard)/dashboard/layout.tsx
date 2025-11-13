"use client";

import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
            <header className="bg-gray-900 px-6 py-4 border-b border-gray-800">
                <h1 className="text-lg font-semibold text-green-400">🏹 Painel do Aventureiro</h1>
            </header>
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
