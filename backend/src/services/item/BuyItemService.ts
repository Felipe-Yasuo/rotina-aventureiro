import { prisma } from "../../prisma";
import { AppError } from "../../errors/AppError";

interface BuyItemRequest {
    userId: string;
    itemId: string;
}

export class BuyItemService {
    async execute({ userId, itemId }: BuyItemRequest) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new AppError("Usuário não encontrado.", 404);

        const item = await prisma.item.findUnique({ where: { id: itemId } });
        if (!item) throw new AppError("Item não encontrado.", 404);

        if (user.money < item.price) {
            throw new AppError("Dinheiro insuficiente.", 400);
        }


        const alreadyHas = await prisma.userItem.findFirst({
            where: { userId, itemId },
        });

        if (alreadyHas) {
            throw new AppError("Você já possui este item.", 409);
        }


        await prisma.userItem.create({
            data: { userId, itemId },
        });

        await prisma.user.update({
            where: { id: userId },
            data: { money: { decrement: item.price } },
        });

        await prisma.activity.create({
            data: {
                userId,
                action: "BOUGHT_ITEM",
                description: `${user.name} comprou "${item.name}" por ${item.price} moedas.`,
            },
        });

        return { message: "Compra realizada com sucesso!", item };
    }
}