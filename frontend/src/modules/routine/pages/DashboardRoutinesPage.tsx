"use client";

import RoutineForm from "../components/RoutineForm";
import { useRoutines } from "../hooks/useRoutines";

export function DashboardRoutinesPage() {
    const { routines, loading, reload } = useRoutines();

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-green-400">
                🗡️ Mural de Missões
            </h2>

            <RoutineForm onCreated={reload} />

            {loading ? (
                <p>Carregando...</p>
            ) : routines.length === 0 ? (
                <p className="text-gray-400">Nenhuma missão encontrada.</p>
            ) : (
                <div className="grid gap-4">
                    {routines.map((r) => (
                        <div
                            key={r.id}
                            className="p-5 rounded-xl bg-gray-800 border border-gray-700 shadow-md"
                        >
                            <h3 className="text-xl font-bold">{r.title}</h3>
                            <p className="text-gray-400">{r.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
