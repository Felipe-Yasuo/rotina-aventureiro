import { prisma } from "../../prisma";

export class UpdateDailyStreakService {
    async execute(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("Usuário não encontrado.");

        const today = new Date();
        const last = user.lastStreakAt ? new Date(user.lastStreakAt) : null;

        const diffDays = last ? Math.floor((today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)) : null;

        let newStreak = user.streak;
        let newLives = user.lives;
        let bonusXP = 0;

        if (!last || diffDays === null || diffDays > 1) {
            newStreak = 1;
            newLives = Math.max(0, user.lives - 1);
        } else if (diffDays === 1) {
            newStreak++;
            bonusXP = newStreak * 5;
        } else if (diffDays === 0) {
            return user;
        }

        const updated = await prisma.user.update({
            where: { id: userId },
            data: {
                streak: newStreak,
                lastStreakAt: today,
                lives: newLives,
                xp: { increment: bonusXP },
            },
        });

        await prisma.activity.create({
            data: {
                userId,
                action: diffDays === 1 ? "STREAK_CONTINUE" : "STREAK_RESET",
                description:
                    diffDays === 1
                        ? `${user.name} manteve o streak por ${newStreak} dias consecutivos! 🔥`
                        : `${user.name} perdeu o streak e agora está com ${newLives} vidas.`,
            },
        });

        return updated;
    }
}
