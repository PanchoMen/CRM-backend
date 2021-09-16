import bcrypt from 'bcryptjs';
import UserRepository from "../repositories/userRepository";
import IUser from '../models/user/userInterface';

export default class UserService {
	private repository: UserRepository;

  	constructor(repository: UserRepository) {
    	this.repository = repository;
  	}

	async create(user: IUser){
		return new Promise((resolve, reject) => {
			this.repository.create(user)
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
	}

	async login(username: string, password: string){

	}

	private async compareEncrypted(encrypted1: string, encrypted2: string) {
		return await bcrypt.compare(encrypted1, encrypted2);
	}

	private async encrypt(param: string){
		const salt = await bcrypt.genSalt(10);
  		return await bcrypt.hash(param, salt);
	}
}