import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
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
		user.created = new Date();
		let createdUser = await this.repository.create(user);
		return this.removeSensitiveData(createdUser);
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
		let users = await this.repository.findAll();
		return users.map(user => this.removeSensitiveData(user));
	}

	async getById(id: string){
		let user = await this.repository.findById(id);
		return this.removeSensitiveData(user);
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
		savedUser.lastModified = new Date();
		return await this.repository.save(savedUser);
	}

	async delete(id: string) {
		return await this.repository.deleteById(id);
	}

	private async login(user: IUser | null, password: string){
		if(user && await this.compareEncrypted(user.password, password)){
			const token = this.generateToken(user);
			if(token){
				return token;
			}
		}
		throw new Error('Bad Credentials');
	}

	private removeSensitiveData(user: Partial<IUser> | null) {
		if(user) {
			user.password = undefined;
		}
		return user;
	}

	private generateToken(user: IUser) {
		const secret = process.env.JWT_SECRET || 'secret';
		return sign({ id: user._id, username: user.username, role: user.role}, secret, { expiresIn: '8h' });
	}

	private async compareEncrypted(encrypted: string, input: string) {
		return await bcrypt.compare(input, encrypted);
	}

	private async encrypt(param: string){
		const salt = await bcrypt.genSalt(10);
  		return await bcrypt.hash(param, salt);
	}
}