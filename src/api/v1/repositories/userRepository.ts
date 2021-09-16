import BaseRepository from "./baseRepository";
import IUser from "../models/user/userInterface";
import User  from "../models/user/userSchema";

export default class UserRepository extends BaseRepository<IUser> {
	constructor() {
		super(User);
	}
}