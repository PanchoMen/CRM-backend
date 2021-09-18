import { Document } from 'mongoose'
import { Role } from './role'

export default interface IUser extends Document {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  lastLogin: Date;
  role: Role;
  created: Date;
  lastModified: Date;
}


