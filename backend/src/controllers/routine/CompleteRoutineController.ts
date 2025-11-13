import { Request, Response } from "express";
import { CompleteRoutineService } from "../../services/routine/CompleteRoutineService";
import { AppError } from "../../errors/AppError";

export class CompleteRoutineController {
    async handle(req: Request, res: Response) {
        const { routineId } = req.body;
        const userId = req.user.id;

        if (!routineId) throw new AppError("routineId é obrigatório.", 400);

        const service = new CompleteRoutineService();
        const result = await service.execute({ routineId, userId });

        return res.json(result);
    }
}
