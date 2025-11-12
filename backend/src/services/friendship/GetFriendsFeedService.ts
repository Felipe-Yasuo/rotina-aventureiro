import { prisma } from "../../prisma";

export class GetFriendsFeedService {
    async execute(userId: string) {

        const friendships = await prisma.friendship.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });

        const ids = friendships.map((f) => f.followingId);
        const activities = await prisma.activity.findMany({
            where: { userId: { in: ids } },
            orderBy: { createdAt: "desc" },
            take: 10,
            include: {
                user: { select: { name: true, level: true } },
            },
        });

        return activities;
    }
}
