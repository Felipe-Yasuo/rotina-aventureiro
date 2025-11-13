import { z } from "zod";

export const paginationSchema = z.object({
    page: z
        .coerce
        .number()
        .int()
        .min(1)
        .default(1),

    limit: z
        .coerce
        .number()
        .int()
        .min(1)
        .max(100)
        .default(10),
});


export const rankingQuerySchema = paginationSchema.extend({
    orderBy: z
        .enum(["level", "xp", "money"])
        .optional()
        .default("level"),
});
