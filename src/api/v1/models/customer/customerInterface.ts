import { Document, SchemaType } from 'mongoose'

export default interface ICustomer extends Document {
	name: string;
  	surname: string;
	photo_field?: string;
	created?: { user_id: string, date: Date };
  	lastModified?: { user_id: string, date: Date };
}