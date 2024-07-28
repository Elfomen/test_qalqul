import { Module } from '@nestjs/common';
import { Task2Controller } from './task2.controller';
import { Task2Service } from './task2.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTwo } from './task2.entity';

@Module({
  controllers: [Task2Controller],
  providers: [Task2Service],
  imports: [TypeOrmModule.forFeature([TaskTwo])],
})
export class Task2Module {}
