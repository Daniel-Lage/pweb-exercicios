import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller.js";
import { TasksService } from "../services/tasks.service.js";
import { TasksRepository } from "../repositories/tasks.repository.js";

const repository = new TasksRepository();
const service = new TasksService(repository);
const controller = new TasksController(service);

const router = Router();

router.get("/", controller.listTasks);

router.get("/:id", controller.findTaskById);

router.post("/", controller.createTask);

router.patch("/:id", controller.updateTask);

router.delete("/:id", controller.deleteTask);

export default router;
