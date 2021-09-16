import { Router } from 'express';
import UserService from '../services/userService';

export default class UserController {
	private service: UserService;
  	public readonly router: Router;

	constructor(service: UserService){
		this.service = service;
		this.router = Router();

		this.router.post('/', this.create);
	}

	private async create (req, res) {
		const newUser = req.body;
		const user = await this.service.create(newUser);
		res.json(user);
	};
}