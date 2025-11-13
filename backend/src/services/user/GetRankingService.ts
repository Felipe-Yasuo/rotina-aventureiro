import { prisma } from "../../prisma";

interface RankingRequest {
    page?: number;
    limit?: number;
    orderBy?: "level" | "xp" | "money";
}

export class GetRankingService {
    async execute({ page = 1, limit = 10, orderBy = "level" }: RankingRequest) {
        const skip = (page - 1) * limit;

        const users = await prisma.user.findMany({
            skip,
            take: limit,
            orderBy: [
                { [orderBy]: "desc" },
                { xp: "desc" },
            ],
            select: {
                id: true,
                name: true,
                level: true,
                xp: true,
                money: true,
            },
        });

        const totalUsers = await prisma.user.count();

        return {
            page,
            limit,
            total: totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users,
        };
    }
}

