import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task1' })
export class TaskOne {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  sex: string;

  @Column()
  dateOfBirth: Date;
}
