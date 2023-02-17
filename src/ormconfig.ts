import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';
config();
export default {
  type: 'postgres',
  host: process.env.POSTGRES_HOST as string,
  port: parseInt(process.env.POSTGRES_PORT as string, 10) as number,
  username: process.env.POSTGRES_USER as string,
  password: process.env.POSTGRES_PASSWORD as string,
  database: process.env.POSTGRES_DATABASE as string,
  synchronize: true,
  entities: [User, Track],
  migrations: ['dist/**/migrations/*.js'],
  migrationsRun: true,
} as DataSourceOptions;
