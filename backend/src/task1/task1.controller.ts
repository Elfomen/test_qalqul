import { Controller, Get, Param } from '@nestjs/common';
import { Task1Service } from './task1.service';

@Controller('task1')
export class Task1Controller {
  constructor(private taskOneService: Task1Service) {}
  @Get('/user/:id')
  getUserDetails(@Param('id') id: number) {
    return this.taskOneService.getUserDetails(id);
  }
}
