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
		this.router = Router();
		
		this.router.post('/', (req, res) => controller.create(req, res));
		this.router.get('/list', (req, res) => controller.list(req, res));
		this.router.get('/:customer-id', (req, res) => controller.getByID(req, res));
		this.router.put('/:customer-id', (req, res) => controller.update(req, res));
		this.router.delete('/:customer-id', (req, res) => controller.delete(req, res));
	}

	public getRouter(){
		return this.router;
	}
}