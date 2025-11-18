"use client";

import { useRoutines } from "@/modules/routine/hooks/useRoutines";
import { RoutineCard } from "@/components/routine/RoutineCard";

export default function DashboardPage() {
    const { routines, loading, completeRoutine } = useRoutines();

    if (loading) return <p className="text-center mt-10">Carregando...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <h1 className="text-4xl font-title text-deepTwilight text-center">
                Suas Rotinas ✨
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {routines.map(r => (
                    <RoutineCard
                        key={r.id}
                        routine={r}
                        onComplete={() => completeRoutine(r.id)}
                    />
                ))}
            </div>
        </div>
    );
}
