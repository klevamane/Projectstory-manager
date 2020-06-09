// import { ConnectionOptions } from 'typeorm';
 
// const config: ConnectionOptions = {
//   type: 'postgres',
//   host: process.env.PG_HOST,
//   port: Number(process.env.PG_PORT),
//   username: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DB,
//   entities: [
//     // __dirname + '/../**/*.entity{.ts,.js}',
//     __dirname + './orm/entity',
//   ],
//   synchronize: true,
// };
 
import { ConnectionOptions } from 'typeorm';
 
const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'comfy',
  password: '',
  database: 'stack',
  logging: false,
  entities: [
    // __dirname + '/../**/*.entity{.ts,.js}',
    "api/orm/entity/**/*.ts"
  ],
  synchronize: true,
};

export default config;
