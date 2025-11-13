import { prisma } from "../../prisma";

interface RoutineRequest {
    title: string;
    description?: string;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    imageUrl: string;
    userId: string;
    attributes: ("STRENGTH" | "INTELLIGENCE" | "CHARISMA" | "CREATIVITY" | "HEALTH")[];
}

export class CreateRoutineService {
    async execute({ title, description, difficulty, imageUrl, userId, attributes }: RoutineRequest) {
        const rewards = {
            EASY: { xp: 10, money: 5 },
            MEDIUM: { xp: 25, money: 15 },
            HARD: { xp: 50, money: 30 },
        };

        const routine = await prisma.routine.create({
            data: {
                title,
                description,
                difficulty,
                imageUrl,
                xpReward: rewards[difficulty].xp,
                moneyReward: rewards[difficulty].money,
                userId,
                attributes: {
                    create: attributes.map((attr) => ({ type: attr })),
                },
            },
            include: { attributes: true },
        });

        return routine;
    }
}

