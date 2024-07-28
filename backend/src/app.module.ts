import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Task1Module } from './task1/task1.module';
import { Task2Module } from './task2/task2.module';
import { MiniprojectModule } from './miniproject/miniproject.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configSerice: ConfigService) =>
        typeOrmConfigs(configSerice),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    Task1Module,
    Task2Module,
    MiniprojectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
