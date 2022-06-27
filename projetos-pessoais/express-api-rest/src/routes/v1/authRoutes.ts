import { Router } from "express";

import * as authController from "../../controllers/authController";
import * as authValidator from "../../middlewares/validator/authValidator";

const router = Router();

// POST
router.post("/", authValidator.loginValidator, authController.login);

export default router;
