import { Request, Response } from "express";
import { BuyItemService } from "../../services/item/BuyItemService";
import { AppError } from "../../errors/AppError";

export class BuyItemController {
    async handle(req: Request, res: Response) {
        const userId = req.user.id;
        const { itemId } = req.body;

        if (!itemId) throw new AppError("itemId é obrigatório.", 400);

        const service = new BuyItemService();
        const result = await service.execute({ userId, itemId });

        return res.status(201).json(result);
    }
}
