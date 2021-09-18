import { model, Schema } from 'mongoose';
import { Role } from './role';
import IUser from "./userInterface";

const UserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  lastLogin: { type: Date },
  role: { type: String, enum: Role, default: Role.User, required: true },
  created: { type: Date, default: new Date() },
  lastModified: { type: Date }, //default: Date.now() },
});

export default model<IUser>('User', UserSchema);