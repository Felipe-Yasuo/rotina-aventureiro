import { Request, Response } from "express";

export class UploadImageController {
    async handle(req: Request, res: Response) {
        if (!req.file) {
            return res.status(400).json({ message: "Arquivo não enviado." });
        }

        const baseUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 3333}`;

        return res.json({
            url: `${baseUrl}/uploads/${req.file.filename}`
        });
    }
}