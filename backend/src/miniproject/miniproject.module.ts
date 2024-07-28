import { Module } from '@nestjs/common';
import { MiniprojectService } from './miniproject.service';
import { MiniprojectController } from './miniproject.controller';
import { MiniprojectGateway } from './miniproject.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MiniProject } from './miniproject.entity';

@Module({
  providers: [MiniprojectService, MiniprojectGateway],
  controllers: [MiniprojectController],
  imports: [TypeOrmModule.forFeature([MiniProject])],
})
export class MiniprojectModule {}
