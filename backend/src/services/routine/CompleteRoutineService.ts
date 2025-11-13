import { prisma } from "../../prisma";
import { UpdateDailyStreakService } from "../user/UpdateDailyStreakService";
import { AppError } from "../../errors/AppError";

interface CompleteRequest {
    routineId: string;
    userId: string;
}

export class CompleteRoutineService {
    async execute({ routineId, userId }: CompleteRequest) {

        const updatedUser = await prisma.$transaction(async (tx) => {


            const routine = await tx.routine.findFirst({
                where: { id: routineId, userId },
                include: {
                    attributes: true,
                    user: true,
                }
            });

            if (!routine) {
                throw new AppError("Rotina não encontrada.", 404);
            }

            if (routine.completed) {
                throw new AppError("Rotina já concluída.", 409);
            }


            await tx.routine.update({
                where: { id: routine.id },
                data: { completed: true },
            });


            let newXp = routine.user.xp + routine.xpReward;
            let newMoney = routine.user.money + routine.moneyReward;
            let newLevel = routine.user.level;

            let xpNeeded = newLevel * 100;

            while (newXp >= xpNeeded) {
                newXp -= xpNeeded;
                newLevel++;
                newMoney += 50;
                xpNeeded = newLevel * 100;
            }

            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: {
                    xp: newXp,
                    money: newMoney,
                    level: newLevel,
                },
            });


            if (routine.attributes.length > 0) {

                const incrementValue =
                    routine.difficulty === "EASY" ? 1 :
                        routine.difficulty === "MEDIUM" ? 2 : 3;

                const attrUpdates: Record<string, any> = {};

                for (const attr of routine.attributes) {
                    const key = attr.type.toLowerCase(); // "strength", "intelligence", etc.
                    attrUpdates[key] = { increment: incrementValue };
                }

                await tx.user.update({
                    where: { id: userId },
                    data: attrUpdates,
                });

                await tx.activity.create({
                    data: {
                        userId,
                        routineId,
                        action: "ATTRIBUTE_GAIN",
                        description: `${routine.user.name} aumentou seus atributos em +${incrementValue}! 💪`,
                    },
                });
            }

            await tx.activity.create({
                data: {
                    userId,
                    routineId: routine.id,
                    action: "COMPLETED_ROUTINE",
                    description: `${routine.user.name} concluiu "${routine.title}" (${routine.difficulty}) e ganhou ${routine.xpReward} XP!`,
                },
            });

            return updatedUser;
        });


        const streakService = new UpdateDailyStreakService();
        await streakService.execute(userId);

        return {
            message: `Rotina concluída! ${updatedUser.level ? "Level Up! 🔥" : ""}`,
            user: updatedUser,
        };
    }
}
