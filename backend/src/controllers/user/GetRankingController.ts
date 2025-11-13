import { Request, Response } from "express";
import { GetRankingService } from "../../services/user/GetRankingService";
import { rankingQuerySchema } from "../../validations/querySchemas";

export class GetRankingController {
    async handle(req: Request, res: Response) {
        const { page, limit, orderBy } = rankingQuerySchema.parse(req.query);

        const service = new GetRankingService();
        const ranking = await service.execute({
            page,
            limit,
            orderBy,
        });

        return res.json(ranking);
    }
}