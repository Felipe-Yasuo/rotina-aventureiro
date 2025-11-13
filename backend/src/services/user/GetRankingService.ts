import { prisma } from "../../prisma";
import { AppError } from "../../errors/AppError";

interface RankingRequest {
    page?: number;
    limit?: number;
    orderBy?: "level" | "xp" | "money";
}

export class GetRankingService {
    async execute({ page = 1, limit = 10, orderBy = "level" }: RankingRequest) {


        const allowedOrderFields = ["level", "xp", "money"] as const;

        if (!allowedOrderFields.includes(orderBy)) {
            throw new AppError("Parâmetro orderBy inválido.", 400);
        }

        const skip = (page - 1) * limit;

        const safeOrder = orderBy as "level" | "xp" | "money";

        const users = await prisma.user.findMany({
            skip,
            take: limit,
            where: {
                deletedAt: null,
            },
            orderBy: [
                { [safeOrder]: "desc" },
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

        const totalUsers = await prisma.user.count({
            where: { deletedAt: null },
        });

        return {
            page,
            limit,
            total: totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            users,
        };
    }
}
