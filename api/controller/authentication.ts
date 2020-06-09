import bcryptjs, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { validate } from 'class-validator';

import User from '../orm/entity/User';
import { comparePassword, hasPassword } from '../util';

export default class Authentication {
  public login = async (request: Request, response: Response) => {
    const { email, password } = request.body;
    let user: User;
    if (!(email && password))
      return response
        .status(400)
        .json({ message: "enter your email and password", status: "failed" });
    try {
      user = await User.findOneOrFail({ where: { email } });
    } catch (error) {
      return response.status(404).json({ message: 'user not found', status: 'failed' });
    }
    // check if unencrypted password is valid
    if (!comparePassword(password, user.password)) {
      return response.status(400).json({ status: 'failed', msg: 'Invalid password' });
    }

    // sign token
    const token = Authentication.generateJwt(user);
    return response.json({ status: 'success', token });
  }

  public registerUser = async (request: Request, response: Response) => {
    /**
     * @param  {object} req
     * @param  {object} res
     */

    const existingUser = await User.findOne({ email: request.body.email });
    if (existingUser) {
      return response.status(400).json({ message: 'Email already exists' });
    }
    // TODO: Implement validation
    const newUser = new User();
    newUser.email = request.body.email.toLowerCase();
    newUser.firstname = request.body.firstname.toLowerCase();
    newUser.lastname = request.body.lastname.toLowerCase();
    newUser.password = request.body.password;

    const errors = await validate(newUser, { validationError: { target: false, value: false } });
    if (errors.length > 0) return response.status(400).json({ errors });
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(request.body.password, salt, async (err, salt) => {
        if (err) return response.json({ status: 'failed', msg: 'Authentication failed' });
        newUser.password = await hash(request.body.password, 10);
        try {
          const user = await newUser.save();
          // TODO remove password field from new user
          return response.json({ status: 'success', user });
        } catch (error) {
          response.json(error);
        }
      });
    });
  }

  static changeUserPassword = async (request: Request, response: Response) => {
    const { userId } = response.locals.userData;
    const { newPassword, oldPassword } = request.body;
    if (!(newPassword && oldPassword)) {
      return response.status(400).json({ status: 'failed', msg: 'New password and old password required ' });
    }
    let user: User;
    try {
      user = await User.findOneOrFail(userId);
    } catch (error) {
      return response.status(404).send();
    }
    if (!comparePassword(oldPassword, user.password)) {
      response.status(400).json({ status: 'failed', msg: 'Invalid user password' });
    }
    user.password = hasPassword(newPassword);
    user.save();
    return response.json({ status: 'success' });
  }

  private static generateJwt(user: User) {
    return jwt.sign({ userId: user.id, email: user.email, role: user.role }, 'secret', { expiresIn: '24h' });
  }
}
