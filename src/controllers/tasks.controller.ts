import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { TasksService } from "../services/tasks.service.js";
import { AppError } from "../utils/AppError.js";

export class TasksController {
  constructor(private tasksService: TasksService) {}

  listTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await this.tasksService.listTasks();
    res.json(tasks);
  });

  findTaskById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Task ID is required", 400);
    }

    const task = await this.tasksService.findTaskById(Number(id));

    res.json(task);
  });

  createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, completed } = req.body;

    const newTask = await this.tasksService.createTask({ title, completed });

    res.status(201).json(newTask);
  });

  updateTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Task ID is required", 400);
    }

    const { title, completed } = req.body;

    const updatedTask = await this.tasksService.updateTask(Number(id), {
      title,
      completed,
    });

    res.json(updatedTask);
  });

  deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!(typeof id === "string")) {
      throw new AppError("Task ID is required", 400);
    }

    await this.tasksService.deleteTask(Number(id));

    res.status(204).send();
  });
}
