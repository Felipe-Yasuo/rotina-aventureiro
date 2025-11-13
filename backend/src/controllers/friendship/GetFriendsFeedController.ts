import { Request, Response } from "express";
import { GetFriendsFeedService } from "../../services/friendship/GetFriendsFeedService";

export class GetFriendsFeedController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const service = new GetFriendsFeedService();
        const feed = await service.execute(userId, page, limit);

        return res.json(feed);
    }
}

