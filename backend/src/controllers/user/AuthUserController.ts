import { Request, Response } from "express";
import { prisma } from "../../prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import { loginSchema } from "../../validations/userSchemas";
import { userSafeSelect } from "../../utils/selects";

export class AuthUserController {
    async handle(req: Request, res: Response) {
        const { email, password } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new AppError("Senha incorreta.", 401);
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return res.json({
            token,
            user: await prisma.user.findUnique({
                where: { id: user.id },
                select: userSafeSelect
            })
        });
    }
}
