"use client";

import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import RoutineForm from "./RoutineForm";

interface Routine {
    id: string;
    title: string;
    description: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    xpReward: number;
    moneyReward: number;
    completed: boolean;
}

export default function DashboardPage() {
    const { token } = useAuth();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchRoutines() {
        try {
            const res = await api.get("/routines", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setRoutines(res.data);
        } catch (err) {
            console.error("Erro ao carregar rotinas:", err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchRoutines();
    }, []);

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-green-400">Minhas Rotinas</h2>

            <RoutineForm onCreated={fetchRoutines} />

            {loading ? (
                <p>Carregando...</p>
            ) : routines.length === 0 ? (
                <p className="text-gray-400">Nenhuma rotina criada ainda.</p>
            ) : (
                <div className="grid gap-4">
                    {routines.map((r) => (
                        <div
                            key={r.id}
                            className={`p-4 rounded-xl border ${r.completed
                                ? "border-green-500 bg-gray-800/40"
                                : "border-gray-700 bg-gray-800"
                                }`}
                        >
                            <h3 className="text-lg font-semibold">{r.title}</h3>
                            <p className="text-sm text-gray-400">{r.description}</p>
                            <div className="mt-2 flex items-center justify-between text-sm text-gray-300">
                                <span>
                                    💪 Dificuldade:{" "}
                                    {r.difficulty === "EASY"
                                        ? "Fácil"
                                        : r.difficulty === "MEDIUM"
                                            ? "Média"
                                            : "Difícil"}
                                </span>
                                <span>🏆 XP: {r.xpReward}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
