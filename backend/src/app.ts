import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(
            `${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`
        );
    });
    next();
});


app.use(router);



app.use(
    (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("🔥 Erro capturado:", err);

        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: "error",
                message: err.message,
                details: (err as any).details ?? null,
            });
        }


        if ((err as any).issues) {
            return res.status(400).json({
                status: "error",
                message: "Erro de validação nos dados.",
                details: (err as any).issues,
            });
        }

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
        });
    }
);

export { app };
