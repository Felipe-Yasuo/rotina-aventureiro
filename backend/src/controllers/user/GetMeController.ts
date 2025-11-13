import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { AppError } from "../../errors/AppError";

export class GetMeController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                xp: true,
                money: true,
                level: true,
                streak: true,
                lives: true,
                strength: true,
                intelligence: true,
                charisma: true,
                creativity: true,
                health: true,
                createdAt: true,
            }
        });

        if (!user) throw new AppError("Usuário não encontrado.", 404);

        return res.json({ user });
    }
}
