import { useEffect, useState } from "react";
import { getRoutines } from "../api/getRoutines";
import { completeRoutineRequest } from "../api/completeRoutine";
import type { Routine } from "../types/RoutineTypes";

export function useRoutines() {
    const [loading, setLoading] = useState(true);
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [error, setError] = useState<string | null>(null);

    async function load() {
        try {
            setLoading(true);
            const data = await getRoutines();
            setRoutines(data.routines);
        } catch (err) {
            setError("Não foi possível carregar suas rotinas.");
        } finally {
            setLoading(false);
        }
    }

    async function completeRoutine(id: string) {
        await completeRoutineRequest(id);
        await load(); // recarrega a lista
    }

    useEffect(() => {
        load();
    }, []);

    return {
        routines,
        loading,
        error,
        completeRoutine,
        reload: load,
    };
}
