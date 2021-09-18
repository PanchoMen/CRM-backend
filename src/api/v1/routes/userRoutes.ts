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

		this.router.post('/', (req, res) => controller.create(req, res));
		this.router.post('/login', (req, res) => controller.login(req, res));
		this.router.get('/list', (req, res) => controller.list(req, res));
		this.router.get('/:user-id', (req, res) => controller.list(req, res));
		this.router.put('/:user-id', (req, res) => controller.list(req, res));
		this.router.put('/:user-id/admin-status', (req, res) => controller.changeRole(req, res));
		this.router.delete('/:user-id', (req, res) => controller.list(req, res));
	}

	public getRouter(){
		return this.router;
	}
}