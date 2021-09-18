import { Document, SchemaType } from 'mongoose'
import IUser from '../user/userInterface';

export interface UserActionTimestamp extends SchemaType {
	user: IUser,
	date: Date
}

export default interface ICustomer extends Document {
	name: string;
  	surname: string;
	photo_field?: string;
	created?: { user_id: string, date: Date };
  	lastModified?: { user_id: string, date: Date };
}