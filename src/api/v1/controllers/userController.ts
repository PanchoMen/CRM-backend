import { Request, Response } from 'express';
import UserService from '../services/userService';
import ApiResponse from './apiResponse';

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
				res.status(201).json(new ApiResponse(true, 'User created', user));
			}else{
				res.status(400).json(new ApiResponse(true, 'User NOT created'));
			}
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	};

	get (req: Request, res: Response) {
		const userId = req.params.id;
		this.service.getById(userId)
		.then(user => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', user));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	list (req: Request, res: Response) {
		this.service.listAll()
		.then(users => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', users));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	update (req: Request, res: Response) {
		let userId = req.params.id;
		let changes = req.body;
		this.service.update(userId, changes)
		.then(user => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', user));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	delete (req: Request, res: Response) {
		const id = req.params.id;
		this.service.delete(id)
		.then(user => {
			res.status(200).json(new ApiResponse(true, 'Succesfull'));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	changeRole (req: Request, res: Response) {
		const id = req.params.id;
		const role = req.body.role;
		this.service.changeRole(id, role)
		.then(user => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', user));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	login (req: Request, res: Response) {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;
		if(username){
			this.service.loginByUsername(username, password)
			.then(token => {
				res.status(200).json(new ApiResponse(true, 'Succesfull', token));
			})
			.catch(err => {
				res.status(400).json(new ApiResponse(false, String(err)));
			});
		}else if(email){
			this.service.loginByEmail(email, password)
			.then(token => {
				res.status(200).json(new ApiResponse(true, 'Succesfull', token));
			})
			.catch(err => {
				res.status(400).json(new ApiResponse(false, String(err)));
			});
		}else{
			res.status(400).json('Bad Credentials');
		}
	}
}