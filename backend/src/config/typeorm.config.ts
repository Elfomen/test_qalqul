import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { MiniProject } from 'src/miniproject/miniproject.entity';
import { TaskOne } from 'src/task1/task1.entity';
import { TaskTwo } from 'src/task2/task2.entity';

export const typeOrmConfigs = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: configService.get<string>('TYPEORM_HOST'),
  port: configService.get<number>('TYPEORM_PORT'),
  username: configService.get<string>('TYPEORM_USERNAME'),
  password: configService.get<string>('TYPEORM_PASSWORD'),
  database: configService.get<string>('TYPEORM_DATABASE'),
  entities: [TaskOne, TaskTwo, MiniProject],
  synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE'),
});
