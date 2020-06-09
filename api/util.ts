/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';


const hasPassword = (password: string): string => bcrypt.hashSync(password);
const comparePassword = (password: string, encryptedPassword: string):
  boolean => bcrypt.compareSync(password, encryptedPassword);

export enum StatusEnum {
  OPEN = 'open',
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum RoleEnum {
  ADMIN = 'admin',
  User = 'user',

}

export enum ComplexityEnum {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FIVE = 5,
  EIGHT = 8,
}

export enum LabelEnum {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
}

export { comparePassword, hasPassword };
