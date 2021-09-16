import { Router } from 'express';
import UserRepository from '../repositories/userRepository';
import UserService from '../services/userService';
import UserController from '../controllers/userController';

export default class UserRoutes {
	private readonly router : Router;

	constructor(){
		const repository = new UserRepository();
		const service = new UserService(repository);
		const controller = new UserController(service);
		this.router = Router();

		this.router.post('/', controller.create.bind(controller));
	}

	public getRouter(){
		return this.router;
	}
}