import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import CustomerService from '../services/customerService';

export default class CustomerController {
	private service: CustomerService;

	constructor(service: CustomerService){
		this.service = service;
	}

	create (req: Request, res: Response) {
		const userId = res.locals.user.id;
		const newCustomer = req.body;
		this.service.create(userId, newCustomer)
		.then(customer => {
			if(customer) {
				res.status(201).json({ msg: 'Customer created' });
			}else{
				res.status(400).json({ msg: 'Customer NOT created' });
			}
		})
		.catch(error => {
			res.status(400).json({ msg: String(error) });
		});
	};

	list (req: Request, res: Response) {
		this.service.listAll()
		.then(customers => {
			res.status(200).json(customers);
		})
		.catch(error => {
			res.status(400).json({ msg: String(error) });
		});
	}

	getByID (req: Request, res: Response) {
		const id = req.params.id;
		this.service.getById(id)
		.then(customer => {
			res.status(200).json(customer);
		})
		.catch(error => {
			res.status(400).json({ msg: String(error) });
		});
	}

	update (req: Request, res: Response) {
		const userId = res.locals.user.id;
		const customerId = req.params.id;
		const changes = req.body;
		this.service.update(userId, customerId, changes)
		.then(customer => {
			res.status(200).json(customer);
		})
		.catch(error => {
			res.status(400).json({ msg: String(error) });
		});
	}

	delete (req: Request, res: Response) {
		const id = req.params.id;
		this.service.delete(id)
		.then(customer => {
			res.status(200).json(customer);
		})
		.catch(error => {
			res.status(400).json({ msg: String(error) });
		});
	}

	async updloadImage(req: Request, res: Response) {
		const customerId = req.params.id;
		const userId = res.locals.user.id;
		if(req.files && req.files.photo) {
			try {
				const uploaded = await this.service.uploadImage(userId, customerId, req.files.photo as UploadedFile);
				if(uploaded) {
					return res.status(200).json(uploaded);
				}
			} catch (err) {
				return res.status(500).json({ msg: String(err) });
			}
		}
		res.status(400).json();
	}
}