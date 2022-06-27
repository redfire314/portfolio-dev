import { Router } from "express";

import * as userController from "../../controllers/userController";
import * as userValidator from "../../middlewares/validator/userValidator";

const router = Router();

// POST
router.post("/", userValidator.createUserValidator, userController.create);

export default router;
