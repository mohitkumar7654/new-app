import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>) {}

  async getAllTasks(): Promise<Task[]> {
    console.log("------");
    return this.taskModel.find().exec();
  }

  async getTaskById(id: string): Promise<Task> {
    console.log("------");
    return this.taskModel.findById(id).exec();
  }

  async createTask(task: Task): Promise<Task> {
    console.log("---task---");
    const newTask = new this.taskModel(task);
    return newTask.save();
  }

  async updateTask(id: string, updatedTask: Task): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, updatedTask).exec();
  }

}
