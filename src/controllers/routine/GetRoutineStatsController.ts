import { Request, Response } from "express";
import { GetRoutineStatsService } from "../../services/routine/GetRoutineStatsService";

export class GetRoutineStatsController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        const service = new GetRoutineStatsService();
        const stats = await service.execute(userId);

        return res.json(stats);
    }
}

