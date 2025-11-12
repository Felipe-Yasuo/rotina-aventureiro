import { Request, Response } from "express";
import { FollowUserService } from "../../services/friendship/FollowUserService";

export class FollowUserController {
    async handle(req: Request, res: Response) {
        const { followingId } = req.body;
        const followerId = req.user.id;

        const service = new FollowUserService();
        const follow = await service.execute({ followerId, followingId });

        return res.status(201).json(follow);
    }
}
