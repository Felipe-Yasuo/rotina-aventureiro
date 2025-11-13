import { Request, Response } from "express";
import { CreateRoutineService } from "../../services/routine/CreateRoutineService";
import { AppError } from "../../errors/AppError";

export class CreateRoutineController {
    async handle(req: Request, res: Response) {
        const { title, difficulty, imageUrl, attributes } = req.body;
        const userId = req.user.id;

        if (!title || !difficulty || !imageUrl || !attributes) {
            throw new AppError("Dados inválidos para criação de rotina.", 400);
        }

        const service = new CreateRoutineService();
        const routine = await service.execute({
            title,
            description: req.body.description,
            difficulty,
            imageUrl,
            userId,
            attributes,
        });

        return res.status(201).json(routine);
    }
}
