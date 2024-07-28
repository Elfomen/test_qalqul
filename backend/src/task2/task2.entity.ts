import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskPriorities, TaskStatuses } from './task2.types';

@Entity({ name: 'task2' })
export class TaskTwo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  priority: TaskPriorities;

  @Column()
  status: TaskStatuses;
}
