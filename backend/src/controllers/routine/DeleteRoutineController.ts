import { prisma } from "../../prisma";
import { AppError } from "../../errors/AppError";
import { Request, Response } from "express";

export class DeleteRoutineController {
    async handle(req: Request, res: Response) {
        const routineId = req.params.id;
        const userId = req.user.id;

        const routine = await prisma.routine.findFirst({
            where: { id: routineId, userId, deletedAt: null }
        });

        if (!routine) throw new AppError("Rotina não encontrada.", 404);

        await prisma.routine.update({
            where: { id: routineId },
            data: { deletedAt: new Date() }
        });

        return res.json({ message: "Rotina removida com sucesso." });
    }
}
