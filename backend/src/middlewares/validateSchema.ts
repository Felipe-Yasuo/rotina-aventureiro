import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const validateSchema = (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const details = err.issues.map(issue => ({
                    path: issue.path,
                    message: issue.message,
                }));

                throw new AppError("Erro de validação nos dados.", 400, details);
            }

            next(err);
        }
    };
