import type { TaskPayload } from "../models/tasks.model.js";
import type { TasksRepository } from "../repositories/tasks.repository.js";
import { AppError } from "../utils/AppError.js";

export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async listTasks() {
    return this.tasksRepository.listTasks();
  }

  async findTaskById(id: number) {
    const task = this.tasksRepository.findTaskById(id);

    if (!task) {
      throw new AppError("Task not found", 404);
    }

    return task;
  }

  async createTask(payload: TaskPayload) {
    return await this.tasksRepository.createTask(payload);
  }

  async updateTask(id: number, changes: Partial<TaskPayload>) {
    await this.findTaskById(id);
    return this.tasksRepository.updateTask(id, changes);
  }

  async deleteTask(id: number) {
    await this.findTaskById(id);
    return await this.tasksRepository.deleteTask(id);
  }
}
