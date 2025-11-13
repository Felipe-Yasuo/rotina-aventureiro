import { prisma } from "../../prisma";

export class ListItemsService {
    async execute() {
        const items = await prisma.item.findMany({
            where: { deletedAt: null },
            orderBy: { price: "asc" },
        });

        return items;
    }
}