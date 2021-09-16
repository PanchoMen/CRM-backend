import { Router, Request, Response } from 'express';
import CustomerService from '../services/customerService';

export default class CustomerController {
	private service: CustomerService;

	constructor(service: CustomerService){
		this.service = service;
	}

	async create (req: Request, res: Response) {
		const newCustomer = req.body;
		this.service.create(newCustomer)
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
}