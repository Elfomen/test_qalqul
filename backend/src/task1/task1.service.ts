import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskOne } from './task1.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Task1Service {
  constructor(
    @InjectRepository(TaskOne) private taskOneRepo: Repository<TaskOne>,
  ) {}
  async getUserDetails(id: number) {
    const user = await this.taskOneRepo.findOneBy({
      id,
    });

    return user;
  }
}
