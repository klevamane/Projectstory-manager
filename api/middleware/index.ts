// node Packages
import {
  Request, Response, NextFunction,
} from 'express';
import jwt from 'jsonwebtoken';
import winston from 'winston';

// User defined
import { RoleEnum } from '../util';


export const checkAuth = (request: Request, response: Response, next: NextFunction) => {
  try {
    // Access the token from header and exclude
    // eg Bearer and space
    const token = request.headers.authorization?.split(' ')[1] as string;
    // throws error if it fails
    const jwtPayLoad = jwt.verify(token, 'secret');
    // response.locals.jwtPayload = jwtPayLoad;
    // request.userData = jwtPayLoad;
    response.locals.userData = jwtPayLoad;
  } catch (error) {
    winston.error(error);
    // invalid token
    return response.status(401).json({ status: 'failed', msg: 'authentication failed' });
  }
  next();
};

export const checkAdmin = (request: Request, response: Response, next: NextFunction) => {
  if (response.locals.userData.role !== RoleEnum.ADMIN) {
    return response.status(403).json({ status: 'failed', msg: 'Require Admin priviledge ' });
  }
  next();
};


