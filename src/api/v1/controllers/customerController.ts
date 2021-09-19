import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import CustomerService from '../services/customerService';
import ApiResponse from './apiResponse';

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
				res.status(201).json(new ApiResponse(true, 'Customer created', customer));
			}else{
				res.status(400).json(new ApiResponse(false, 'Customer NOT created'));
			}
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	};

	list (req: Request, res: Response) {
		this.service.listAll()
		.then(customers => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', customers));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	getByID (req: Request, res: Response) {
		const id = req.params.id;
		this.service.getById(id)
		.then(customer => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', customer));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	update (req: Request, res: Response) {
		const userId = res.locals.user.id;
		const customerId = req.params.id;
		const changes = req.body;
		this.service.update(userId, customerId, changes)
		.then(customer => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', customer));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	delete (req: Request, res: Response) {
		const id = req.params.id;
		this.service.delete(id)
		.then(customer => {
			res.status(200).json(new ApiResponse(true, 'Succesfull', customer));
		})
		.catch(err => {
			res.status(400).json(new ApiResponse(false, String(err)));
		});
	}

	async updloadImage(req: Request, res: Response) {
		const customerId = req.params.id;
		const userId = res.locals.user.id;
		if(req.files && req.files.photo) {
			try {
				const uploaded = await this.service.uploadImage(userId, customerId, req.files.photo as UploadedFile);
				if(uploaded) {
					return res.status(200).json(new ApiResponse(true, 'Succesfull', uploaded));
				}
			} catch (err) {
				return res.status(500).json(new ApiResponse(false, String(err)));
			}
		}
		res.status(400).json();
	}
}