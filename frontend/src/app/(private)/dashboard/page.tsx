"use client";

import { UserCard } from "@/components/dashboard/UserCard";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <h1 className="font-title text-4xl text-center">Seu Dashboard 🌱</h1>

            <UserCard />

            <p className="text-center font-text text-deepTwilight/70">
                Em breve: rotinas, loja, conquistas, mapa...
            </p>
        </div>
    );
}
