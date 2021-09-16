import { Router } from 'express';
import CustomerService from '../services/customerService';

export default class CustomerController {
	private service: CustomerService;
  	public readonly router: Router;

	constructor(service: CustomerService){
		this.service = service;
		this.router = Router();

		this.router.post('/', this.create);
	}

	private async create (req, res) {
		const newCustomer = req.body;
		const customer = await this.service.create(newCustomer);
		res.json(customer);
	};
}