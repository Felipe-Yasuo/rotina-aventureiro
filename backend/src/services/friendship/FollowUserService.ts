import { prisma } from "../../prisma";

interface FollowRequest {
    followerId: string;
    followingId: string;
}

export class FollowUserService {
    async execute({ followerId, followingId }: FollowRequest) {
        if (followerId === followingId) throw new Error("Você não pode seguir a si mesmo.");

        const already = await prisma.friendship.findFirst({
            where: { followerId, followingId },
        });

        if (already) throw new Error("Você já segue esse usuário.");

        const follow = await prisma.friendship.create({
            data: { followerId, followingId },
        });

        return follow;
    }
}
