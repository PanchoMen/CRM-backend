import { Router } from 'express';
import CustomerRepository from '../repositories/customerRepository';
import CustomerService from '../services/customerService';
import CustomerController from '../controllers/customerController';

export default class CustomerRoutes {
	private readonly router : Router;

	constructor(){
		const repository = new CustomerRepository();
		const service = new CustomerService(repository);
		const controller = new CustomerController(service);
		this.router = controller.router;
	}

	public getRouter(){
		return this.router;
	}
}