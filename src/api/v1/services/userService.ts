import bcrypt from 'bcryptjs';
import UserRepository from "../repositories/userRepository";
import IUser from '../models/user/userInterface';
import { Role } from '../models/user/role';

export default class UserService {
	private repository: UserRepository;

  	constructor(repository: UserRepository) {
    	this.repository = repository;
  	}

	async create(user: IUser){
		user.password = await this.encrypt(user.password);
		return await this.repository.create(user);
	}

	async loginByUsername(username: string, password: string){
		const user = await this.repository.findOne({username: username})
		return await this.login(user, password);
	}

	async loginByEmail(email: string, password: string){
		const user = await this.repository.findOne({email: email})
		return await this.login(user, password);
	}

	async listAll(){
		return await this.repository.findAll();
	}

	async getById(id: string){
		return await this.repository.findById(id);
	}

	async changeRole(id: string, role: Role) {
		let savedUser = await this.repository.findById(id);
		if(savedUser) {
			savedUser.role = role;
			return await savedUser.save();
		}
		throw new Error('User not found');
	}

	async update(id: string, newUser: IUser) {
		let savedUser = await this.repository.findById(id);
		savedUser = Object.assign(savedUser, newUser);
		return await this.repository.save(savedUser);
	}

	async delete(id: string) {
		return await this.repository.deleteById(id);
	}

	private async login(user: IUser | null, password: string){
		if(user){
			const result = await this.compareEncrypted(user.password, password);
			if(result) {
				return true;
			}
		}
		throw new Error('Bad Credentials');
	}

	private async compareEncrypted(encrypted: string, input: string) {
		return await bcrypt.compare(input, encrypted);
	}

	private async encrypt(param: string){
		const salt = await bcrypt.genSalt(10);
  		return await bcrypt.hash(param, salt);
	}
}