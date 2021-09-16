import { Router, Request, Response } from 'express';
import UserService from '../services/userService';

export default class UserController {
	private service: UserService;

	constructor(service: UserService){
		this.service = service;
	}

	create (req: Request, res: Response) {
		const newUser = req.body;
		this.service.create(newUser)
		.then(user => {
			if(user) {
				res.status(201).json({ msg: 'User created' });
			}else{
				res.status(400).json({ msg: 'User NOT created' });
			}
		})
		.catch(error => {
			res.status(400).json({ msg: String(error) });
		});
	};
}