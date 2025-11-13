import { Request, Response } from "express";
import { FollowUserService } from "../../services/friendship/FollowUserService";
import { AppError } from "../../errors/AppError";

export class FollowUserController {
    async handle(req: Request, res: Response) {
        const { followingId } = req.body;
        const followerId = req.user.id;

        if (!followingId) throw new AppError("followingId é obrigatório.", 400);

        const service = new FollowUserService();
        const follow = await service.execute({ followerId, followingId });

        return res.status(201).json(follow);
    }
}
