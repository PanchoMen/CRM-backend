import { Schema, model } from "mongoose";
import userSchema from "../user/userSchema";
import ICustomer, { UserActionTimestamp } from "./customerInterface";

const CustomerSchema: Schema = new Schema<ICustomer>({
	name: { type: String, required: true },
  	surname: { type: String, required: true },
	photo_field: { type: String },
  	created: { user_id: String, date: Date },
  	lastModified: { user_id: String, date: Date },
});

export default model<ICustomer>('Customer', CustomerSchema);