import { Router, Request, Response } from "express";
import { prisma } from "./prisma";

const router = Router();


router.get("/users", async (req, res) => {
    const users = await prisma.user.findMany();
    return res.json(users);
});

export { router };

