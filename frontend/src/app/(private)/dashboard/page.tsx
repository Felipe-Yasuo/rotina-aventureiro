"use client";

import Link from "next/link";
import { useRoutines } from "@/modules/routine/hooks/useRoutines";
import { RoutineCard } from "@/components/routine/RoutineCard";

export default function DashboardPage() {
    const { routines, loading, completeRoutine } = useRoutines();

    if (loading) return <p className="text-center mt-10">Carregando...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* Título + Botão */}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-title text-deepTwilight">
                    Suas Rotinas ✨
                </h1>

                <Link
                    href="/create"
                    className="px-4 py-2 bg-frierenBlue text-deepTwilight rounded-xl shadow hover:bg-skyMist transition font-title active:scale-[0.98]"
                >
                    + Criar Rotina
                </Link>
            </div>

            {/* Lista de Rotinas */}
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
