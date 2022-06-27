import { Router } from "express";

import * as taskController from "../../controllers/taskController";
import * as taskValidator from "../../middlewares/validator/taskValidator";
import * as authentication from "../../middlewares/auth/authentication";

const router = Router();

// POST
router.post("/", authentication.authenticate, taskValidator.createTaskValidator, taskController.create);

// GET
router.get("/", authentication.authenticate, taskController.getAllTasks);
router.get("/:id", authentication.authenticate, taskController.getTaskById);

// PUT
router.put("/", authentication.authenticate, taskValidator.updateTaskValidator, taskController.update);

// DELETE
router.delete("/", authentication.authenticate, taskValidator.removeTaskValidator, taskController.remove);

// PATCH
router.patch("/", authentication.authenticate, taskValidator.toggleStatusTaskValidator, taskController.toggleStatus);

export default router;
