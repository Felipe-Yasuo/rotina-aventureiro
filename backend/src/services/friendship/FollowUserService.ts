import { AppError } from "../../errors/AppError";
import { prisma } from "../../prisma";

interface FollowRequest {
    followerId: string;
    followingId: string;
}

export class FollowUserService {
    async execute({ followerId, followingId }: FollowRequest) {
        if (followerId === followingId) throw new AppError("Você não pode seguir a si mesmo.", 400);

        const already = await prisma.friendship.findFirst({
            where: { followerId, followingId },
        });

        if (already) throw new AppError("Você já segue esse usuário.", 409);

        const follow = await prisma.friendship.create({
            data: { followerId, followingId },
        });

        return follow;
    }
}
