import { Request, Response } from 'express';
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
			res.status(400).json(String(error));
		});
	};

	get (req: Request, res: Response) {
		const userId = req.params.id;
		this.service.getById(userId)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(400).json(String(error));
		});
	}

	list (req: Request, res: Response) {
		this.service.listAll()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(error => {
			res.status(400).json(String(error));
		});
	}

	update (req: Request, res: Response) {
		let userId = req.params.id;
		let changes = req.body;
		this.service.update(userId, changes)
		.then(result => {
			res.status(200).json(result);
		})
		.catch(error => {
			res.status(400).json(String(error));
		});
	}

	delete (req: Request, res: Response) {
		const id = req.params.id;
		this.service.delete(id)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(400).json(String(error));
		});
	}

	changeRole (req: Request, res: Response) {
		const id = req.params.id;
		const role = req.body.role;
		this.service.changeRole(id, role)
		.then(user => {
			res.status(200).json(user);
		})
		.catch(error => {
			res.status(400).json(String(error));
		});
	}

	login (req: Request, res: Response) {
		const username = req.body.username;
		const email = req.body.email;
		const password = req.body.password;
		if(username){
			this.service.loginByUsername(username, password)
			.then(token => {
				res.status(200).json(token);
			})
			.catch(error => {
				res.status(400).json(String(error));
			});
		}else if(email){
			this.service.loginByEmail(email, password)
			.then(token => {
				res.status(200).json(token);
			})
			.catch(error => {
				res.status(400).json(String(error));
			});
		}else{
			res.status(400).json('Bad Credentials');
		}
	}
}