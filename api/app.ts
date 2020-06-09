import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection, Connection } from 'typeorm';
import dotenv from 'dotenv';
import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import logger from 'morgan';

import storyRouter from './routes/story';
import authRouter from './routes/authentication';
import adminRouter from './routes/admin';
import config from './ormconfig';
import winston from 'winston';
import errorMiddleware from './middleware/error.middleware';


// // initialize configuration
// dotenv.config()

// const app: Application = express();
// // const corOptions = {
// //   origin: '*',
// //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
// //   preflightContinue: false,
// //   optionsSuccessStatus: 204,
// // };
// console.log('happening right now');
// async () => {
//   try {
//     await createConnection(config);
//   } catch (error) {
//     winston.info('error connecting to the database')
//   }
// }
// // configure third party middleware
// // app.use(cors(corOptions));
// // Log Http methods to the console
// app.use(logger('dev'));
// // app.use(helmet());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({ origin: process.env.CORS_URL, optionsSuccessStatus: 200 }))
// // app.use(express.json());


// app.use('/v1/story', storyRouter);
// app.use('/v1/auth', authRouter);
// app.use('/v1/admin', adminRouter);
// app.get('/', (request: Request, response: Response) => {
//   response.status(200).json({ message: 'Backend coding challenge' });
// });

// export default app;

class App {

  public app: Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares()
    this.initalizeControllers();
    this.initializeErrorHandlers();
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(logger('dev'));
    // this.app.use(helmet());
    // this.app.use(errorMiddleware)
  }
  private initalizeControllers() {
    this.app.use('/v1/story', storyRouter);
    this.app.use('/v1/auth', authRouter);
    this.app.use('/v1/admin', adminRouter);
  }
  private initializeErrorHandlers() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () =>winston.info(`Backend API is running on port ${this.port}`))
  }
}

export default App;