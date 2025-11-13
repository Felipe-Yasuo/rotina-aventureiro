import { Request, Response } from "express";
import { GetFriendsFeedService } from "../../services/friendship/GetFriendsFeedService";
import { paginationSchema } from "../../validations/querySchemas";

export class GetFriendsFeedController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;


        const { page, limit } = paginationSchema.parse(req.query);

        const service = new GetFriendsFeedService();
        const feed = await service.execute(userId, page, limit);

        return res.json(feed);
    }
}
