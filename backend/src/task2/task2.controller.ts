import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task2Service } from './task2.service';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TaskStatuses } from './task2.types';

@Controller('task2')
export class Task2Controller {
  constructor(private taskTwoService: Task2Service) {}

  @Get('task-list')
  getTaskList() {
    return this.taskTwoService.getTaskList();
  }

  @Post('/task')
  createNewTask(@Body() data: CreateTaskDTO) {
    return this.taskTwoService.createNewTask(data);
  }

  @Put('/task/:id')
  updateTaskStatus(
    @Param('id') id: number,
    @Body() { status }: { status: TaskStatuses },
  ) {
    return this.taskTwoService.updateTaskStatus(id, status);
  }

  @Delete('/task/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskTwoService.deleteTask(id);
  }
}
