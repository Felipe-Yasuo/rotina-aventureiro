import { Request, Response } from "express";
import { GetFriendsFeedService } from "../../services/friendship/GetFriendsFeedService";

export class GetFriendsFeedController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;
        const service = new GetFriendsFeedService();
        const feed = await service.execute(userId);

        return res.json(feed);
    }
}
