import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import { Track } from './track/entities/track.entity';
import { User } from './user/entities/user.entity';
config();
export const username = process.env.POSTGRES_USER;
export const password = process.env.POSTGRES_PASSWORD;
export const database = process.env.POSTGRES_DATABASE;
export const host = process.env.POSTGRES_HOST;
export const ormConfigMigrations: DataSourceOptions = {
  type: 'postgres',
  host,
  username,
  password,
  database,
  entities: [User, Track, Album, Artist, Favorite],
  migrations: [__dirname, 'dist/**/migrations/*.js'],
  synchronize: true,
};

export const dataSource = new DataSource(ormConfigMigrations);
