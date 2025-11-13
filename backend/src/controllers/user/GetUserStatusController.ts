import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { AppError } from "../../errors/AppError";

export class GetUserStatusController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                streak: true,
                lives: true,
                xp: true,
                level: true,
            },
        });

        if (!user) throw new AppError("Usuário não encontrado.", 404);

        return res.json(user);
    }
}
