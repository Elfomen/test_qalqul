import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskPriorities, TaskStatuses } from '../task2.types';

export class CreateTaskDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsIn([TaskStatuses.done, TaskStatuses['in-progress'], TaskStatuses.todo])
  status: TaskStatuses;

  @IsString()
  @IsNotEmpty()
  @IsIn([TaskPriorities.high, TaskPriorities.medium, TaskPriorities.low])
  priority: TaskPriorities;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;
}
