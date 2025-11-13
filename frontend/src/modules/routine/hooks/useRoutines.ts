import { useEffect, useState } from "react";
import { getUserRoutines } from "../services/routineService";
import type { Routine } from "../type";

export function useRoutines() {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);

    async function load() {
        try {
            const data = await getUserRoutines();
            setRoutines(data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return { routines, loading, reload: load };
}
