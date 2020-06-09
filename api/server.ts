import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import App from './app';
import config from './ormconfig';

(async () => {
    try {
      await createConnection(config);
    } catch (error) {
      console.log('Error while connecting to the database', error);
      return error;
    }
    const app = new App(4000);
    app.listen();
  })();