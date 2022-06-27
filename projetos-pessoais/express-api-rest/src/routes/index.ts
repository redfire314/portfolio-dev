import { Router } from "express";

import usersRoutes from "./v1/usersRoutes";
import authRoutes from "./v1/authRoutes";
import tasksRoutes from "./v1/tasksRoutes";

const router = Router();

// v1
router.use("/v1/user", usersRoutes);
router.use("/v1/auth", authRoutes);
router.use("/v1/task", tasksRoutes);

export default router;
