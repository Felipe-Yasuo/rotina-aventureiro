import { Request, Response } from "express";
import { CreateRoutineService } from "../../services/routine/CreateRoutineService";

export class CreateRoutineController {
    async handle(req: Request, res: Response) {
        const { title, description, difficulty, imageUrl, attributes, } = req.body;
        const userId = req.user.id;

        const service = new CreateRoutineService();
        const routine = await service.execute({
            title,
            description,
            difficulty,
            imageUrl,
            userId,
            attributes,
        });

        return res.status(201).json(routine);
    }
}
