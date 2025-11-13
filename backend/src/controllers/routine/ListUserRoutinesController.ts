import { Request, Response } from "express";
import { prisma } from "../../prisma";
import { paginationSchema } from "../../validations/querySchemas";

export class ListUserRoutinesController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;

        const { page, limit } = paginationSchema.parse(req.query);
        const skip = (page - 1) * limit;

        const routines = await prisma.routine.findMany({
            where: {
                userId,
                deletedAt: null,
            },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            include: { attributes: true },
        });

        const total = await prisma.routine.count({
            where: {
                userId,
                deletedAt: null,
            },
        });

        return res.json({
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            routines,
        });
    }
}
