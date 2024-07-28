import { TaskOne } from 'src/task1/task1.entity';
import { DataSource } from 'typeorm';

export default class CreateuserSeed {
  public async run(dataSource: DataSource): Promise<any> {
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(TaskOne)
      .values([
        {
          name: 'Fomena Yannick',
          phoneNumber: '678943021',
          dateOfBirth: new Date(),
          email: 'gaelfomen@gmail.com',
          sex: 'M',
        },
        {
          name: 'Test user 2',
          phoneNumber: '678943021',
          dateOfBirth: new Date(),
          email: 'test2@gmail.com',
          sex: 'M',
        },
        {
          name: 'Test User 3',
          phoneNumber: '678943021',
          dateOfBirth: new Date(),
          email: 'test3@gmail.com',
          sex: 'M',
        },
        {
          name: 'Test User 4',
          phoneNumber: '678943021',
          dateOfBirth: new Date(),
          email: 'test4@gmail.com',
          sex: 'M',
        },
        {
          name: 'Test User 5',
          phoneNumber: '678943021',
          dateOfBirth: new Date(),
          email: 'test5@gmail.com',
          sex: 'M',
        },
        {
          name: 'Test User 6',
          phoneNumber: '678943021',
          dateOfBirth: new Date(),
          email: 'test6@gmail.com',
          sex: 'M',
        },
      ])
      .execute();
  }
}
