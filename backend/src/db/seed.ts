import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { SeederModule } from './seeder.module';
import CreateuserSeed from './seeders/CreateUserSeed';

export async function runSeeders(): Promise<void> {
  console.log('Starting seeder process...');
  const app = await NestFactory.create(SeederModule);
  console.log('NestJS application created.');
  const dataSource = app.get(DataSource);
  console.log('DataSource retrieved.');

  const seeders = [CreateuserSeed];

  for (const Seeder of seeders) {
    console.log(`Running seeder: ${Seeder.name}`);
    const seeder = new Seeder();
    try {
      await seeder.run(dataSource);
      console.log(`Seeder ${Seeder.name} completed successfully.`);
    } catch (error) {
      console.error(`Error running seeder ${Seeder.name}:`, error);
    }
  }

  console.log('All seeders have been executed successfully.');
  await app.close();
  console.log('Application closed.');
}

// Call the runSeeders function
runSeeders().catch((error) => {
  console.error('Error running seeders:', error);
  process.exit(1);
});
