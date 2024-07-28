import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskTwo } from './task2.entity';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskStatuses } from './task2.types';

@Injectable()
export class Task2Service {
  constructor(
    @InjectRepository(TaskTwo) private taskTwoRepo: Repository<TaskTwo>,
  ) {}

  async getTaskList() {
    return await this.taskTwoRepo.find();
  }

  async createNewTask(data: CreateTaskDTO) {
    const task = new TaskTwo();
    task.description = data.description;
    task.name = data.name;
    task.startDate = data.startDate || new Date();
    task.endDate = data.endDate || new Date();
    task.priority = data.priority;
    task.status = data.status;

    const created = await this.taskTwoRepo.save(task);

    return created;
  }

  async updateTaskStatus(id: number, status: TaskStatuses) {
    const task = await this.taskTwoRepo.findOneBy({ id });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    task.status = status;

    await this.taskTwoRepo.save(task);

    return task;
  }

  async deleteTask(id: number) {
    return this.taskTwoRepo.delete({ id });
  }
}
