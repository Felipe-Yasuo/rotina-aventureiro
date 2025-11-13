import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { AppError } from "../../errors/AppError";
import { userSafeSelect } from "../../utils/selects";

export class GetMeController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: userSafeSelect,
        });

        if (!user) throw new AppError("Usuário não encontrado.", 404);

        return res.json({ user });
    }
}
