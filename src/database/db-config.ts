import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptionst: DataSourceOptions = {
  type: 'postgres',
  host: process.env.PGHOST,
  port: 5432,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  entities: ['dist/**/*entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  migrationsRun: false,
  synchronize: true,
  logging: ['warn', 'error'],
  ssl: {
    rejectUnauthorized: false,
  },
};

export const dataSourse = new DataSource(dataSourceOptionst);
