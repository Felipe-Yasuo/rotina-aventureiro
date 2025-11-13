import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { createUserSchema } from "../../validations/userSchemas";

export class CreateUserController {
    async handle(req: Request, res: Response) {

        const { name, email, password } = createUserSchema.parse(req.body);


        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) {
            throw new AppError("Usuário já existe.", 409);
        }


        const hash = await bcrypt.hash(password, 8);


        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash,
            },
            select: {
                id: true,
                name: true,
                email: true,
                xp: true,
                money: true,
                level: true,
                createdAt: true,
            },
        });

        return res.status(201).json(user);
    }
}
