import { prisma } from "../../prisma";
import { Request, Response } from "express";


export class DeleteUserController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        await prisma.user.update({
            where: { id: userId },
            data: { deletedAt: new Date() }
        });

        return res.json({ message: "Conta deletada com sucesso." });
    }
}
