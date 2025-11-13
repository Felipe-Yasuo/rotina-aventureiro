import { prisma } from "../../prisma";
import { UpdateDailyStreakService } from "../user/UpdateDailyStreakService";

interface CompleteRequest {
    routineId: string;
    userId: string;
}

export class CompleteRoutineService {
    async execute({ routineId, userId }: CompleteRequest) {
        const routine = await prisma.routine.findFirst({
            where: { id: routineId, userId },
            include: {
                attributes: true,
                user: true
            }
        });

        if (!routine) throw new Error("Rotina não encontrada.");
        if (routine.completed) throw new Error("Rotina já concluída.");


        await prisma.routine.update({
            where: { id: routine.id },
            data: { completed: true },
        });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("Usuário não encontrado.");


        let newXp = user.xp + routine.xpReward;
        let newMoney = user.money + routine.moneyReward;
        let newLevel = user.level;

        let xpNeeded = newLevel * 100;

        while (newXp >= xpNeeded) {
            newXp -= xpNeeded;
            newLevel++;
            newMoney += 50;
            xpNeeded = newLevel * 100;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                xp: newXp,
                money: newMoney,
                level: newLevel,
            },
        });

        // busca atributos da rotina
        const attrs = await prisma.routineAttribute.findMany({
            where: { routineId },
        });

        if (attrs.length > 0) {
            const incrementValue =
                routine.difficulty === "EASY" ? 1 :
                    routine.difficulty === "MEDIUM" ? 2 :
                        3;

            const attrUpdates: any = {};

            for (const a of attrs) {
                switch (a.type) {
                    case "STRENGTH":
                        attrUpdates.strength = { increment: incrementValue };
                        break;
                    case "INTELLIGENCE":
                        attrUpdates.intelligence = { increment: incrementValue };
                        break;
                    case "CHARISMA":
                        attrUpdates.charisma = { increment: incrementValue };
                        break;
                    case "CREATIVITY":
                        attrUpdates.creativity = { increment: incrementValue };
                        break;
                    case "HEALTH":
                        attrUpdates.health = { increment: incrementValue };
                        break;
                }
            }

            await prisma.user.update({
                where: { id: userId },
                data: attrUpdates,
            });

            // cria atividade no feed
            await prisma.activity.create({
                data: {
                    userId,
                    routineId,
                    action: "ATTRIBUTE_GAIN",
                    description: `${user.name} aumentou seus atributos em +${incrementValue}! 💪`,
                },
            });
        }



        await prisma.activity.create({
            data: {
                userId,
                routineId: routine.id,
                action: "COMPLETED_ROUTINE",
                description: `${user.name} completou "${routine.title}" (${routine.difficulty}) e ganhou ${routine.xpReward} XP!`,
            },
        });


        const streakService = new UpdateDailyStreakService();
        await streakService.execute(userId);

        return {
            message: `Rotina concluída! ${newLevel > user.level ? "Level Up! 🔥" : ""}`,
            user: updatedUser,
        };
    }
}
