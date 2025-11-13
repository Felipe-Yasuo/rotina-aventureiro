import { Request, Response } from "express";
import { GetRankingService } from "../../services/user/GetRankingService";

export class GetRankingController {
    async handle(req: Request, res: Response) {
        const { page, limit, orderBy } = req.query;

        const service = new GetRankingService();
        const ranking = await service.execute({
            page: Number(page),
            limit: Number(limit),
            orderBy: orderBy as "level" | "xp" | "money",
        });

        return res.json(ranking);
    }
}

