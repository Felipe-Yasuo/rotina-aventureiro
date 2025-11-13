import { prisma } from "../../prisma";

export class GetRoutineStatsService {
    async execute(userId: string) {

        const routines = await prisma.routine.findMany({
            where: {
                userId,
                completed: true,
                deletedAt: null,
            },
            select: { difficulty: true },
        });


        const stats = {
            easy: 0,
            medium: 0,
            hard: 0,
            total: 0,
        };

        for (const r of routines) {
            if (r.difficulty === "EASY") stats.easy++;
            else if (r.difficulty === "MEDIUM") stats.medium++;
            else if (r.difficulty === "HARD") stats.hard++;
            stats.total++;
        }

        return stats;
    }
}

