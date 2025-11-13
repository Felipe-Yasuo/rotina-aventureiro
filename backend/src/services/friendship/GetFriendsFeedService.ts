import { prisma } from "../../prisma";

export class GetFriendsFeedService {
    async execute(userId: string, page = 1, limit = 10) {
        const skip = (page - 1) * limit;

        const friendships = await prisma.friendship.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });

        const ids = friendships.map(f => f.followingId);

        const activities = await prisma.activity.findMany({
            where: {
                userId: { in: ids },
                user: { deletedAt: null },
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            include: { user: { select: { name: true, level: true } } },
        });

        const total = await prisma.activity.count({ where: { userId: { in: ids } } });

        return {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            activities,
        };
    }
}

