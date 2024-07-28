import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'miniproject' })
export class MiniProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  data: string;

  @Column({ nullable: true })
  createdOn: Date;

  @Column({ nullable: true })
  updatedOn: Date;
}
