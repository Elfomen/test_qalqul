import { Module } from '@nestjs/common';
import { Task1Service } from './task1.service';
import { Task1Controller } from './task1.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskOne } from './task1.entity';

@Module({
  providers: [Task1Service],
  controllers: [Task1Controller],
  imports: [TypeOrmModule.forFeature([TaskOne])],
})
export class Task1Module {}
