import type { TaskObject, TaskPayload } from "../models/tasks.model.js";

const tasks: TaskObject[] = [];

export class TasksRepository {
  async listTasks() {
    return tasks;
  }

  async findTaskById(id: number) {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    return task;
  }

  async createTask(payload: TaskPayload) {
    const newTask = { id: tasks.length, ...payload };

    tasks.push(newTask);

    return newTask as TaskObject;
  }

  async updateTask(id: number, changes: Partial<TaskPayload>) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return null;
    }

    const task = tasks[index]!;

    const definedChanges = Object.fromEntries(
      Object.entries(changes).filter((entry) => {
        const value = entry[1];
        return value !== undefined;
      }),
    ) as Partial<TaskPayload>;

    const newTask = {
      ...task,
      ...definedChanges,
    };

    tasks[index] = newTask;

    return newTask;
  }

  async deleteTask(id: number) {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) {
      return false;
    }

    tasks.splice(index, 1);

    return true;
  }
}
