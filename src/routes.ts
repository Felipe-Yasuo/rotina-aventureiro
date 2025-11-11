import { Router } from "express";
import { prisma } from "./prisma";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { CreateRoutineController } from "./controllers/routine/CreateRoutineController";
import { CompleteRoutineController } from "./controllers/routine/CompleteRoutineController";
import { GetRankingController } from "./controllers/user/GetRankingController";
import { FollowUserController } from "./controllers/friendship/FollowUserController";
import { GetFriendsFeedController } from "./controllers/friendship/GetFriendsFeedController";

const router = Router();

const getRanking = new GetRankingController();
const createUser = new CreateUserController();
const authUser = new AuthUserController();
const createRoutine = new CreateRoutineController();
const completeRoutine = new CompleteRoutineController();
const followUser = new FollowUserController();
const getFriendsFeed = new GetFriendsFeedController();

router.post("/users", (req, res) => createUser.handle(req, res));
router.post("/session", (req, res) => authUser.handle(req, res));

// Rotas protegidas
router.post("/routines", isAuthenticated, (req, res) => createRoutine.handle(req, res));
router.put("/routines/complete", isAuthenticated, (req, res) => completeRoutine.handle(req, res));
router.get("/ranking", isAuthenticated, (req, res) => getRanking.handle(req, res));
router.post("/friends/follow", isAuthenticated, (req, res) => followUser.handle(req, res));
router.get("/friends/feed", isAuthenticated, (req, res) => getFriendsFeed.handle(req, res));

// Exemplo de consulta das rotinas do usuário
router.get("/routines", isAuthenticated, async (req, res) => {
    const routines = await prisma.routine.findMany({ where: { userId: req.user.id } });
    return res.json(routines);
});


export { router };
