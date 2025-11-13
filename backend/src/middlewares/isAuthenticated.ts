import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface Payload {
    id: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token não informado.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { id } = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as Payload;

        req.user = { id };

        return next();
    } catch (err) {
        throw new AppError("Token inválido ou expirado.", 401);
    }
}
