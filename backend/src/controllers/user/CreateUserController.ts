import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import { AppError } from "../../errors/AppError";


export class CreateUserController {
    async handle(req: Request, res: Response) {
        const { name, email, password } = req.body;

        if (!name || !email || !password)
            throw new AppError("Preencha todos os campos.", 400);

        const userExists = await prisma.user.findUnique({
            where: { email },
        });

        if (userExists) throw new AppError("Usuário já existe.", 409);;

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

