import ICustomer, { IPartialCustomer } from '../models/customer/customerInterface';
import CustomerRepository from '../repositories/customerRepository';

export default class CustomerService {
	private repository: CustomerRepository;

  	constructor(repository: CustomerRepository) {
    	this.repository = repository;
  	}

	async create(userId: string, customer: ICustomer){
		customer.created = { user_id: userId, date: new Date() };
		return await this.repository.create(customer);
	}

	async listAll(){
		return await this.repository.findAll();
	}

	async getById(id: string){
		return await this.repository.findById(id);
	}

	async update(userId: string, customerId: string, changes: IPartialCustomer) {
		let customer = await this.repository.findById(customerId);
		customer = Object.assign(customer, changes);
		customer.lastModified = { user_id: userId, date: new Date() };
		return await this.repository.save(customer);
	}

	async delete(id: string) {
		return await this.repository.deleteById(id);
	}
}