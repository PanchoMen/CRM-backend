import ICustomer from '../models/customer/customerInterface';
import CustomerRepository from '../repositories/customerRepository';

export default class CustomerService {
	private repository: CustomerRepository;

  	constructor(repository: CustomerRepository) {
    	this.repository = repository;
  	}

	async create(customer: ICustomer){
		return await this.repository.create(customer);
	}

	async listAll(){
		return await this.repository.findAll();
	}

	async getById(id: string){
		return await this.repository.findById(id);
	}

	async update(id: string, newUser: ICustomer) {
		let savedUser = await this.repository.findById(id)
		savedUser = Object.assign(savedUser, newUser);
		return await this.repository.save(savedUser);
	}

	async delete(id: string) {
		return await this.repository.deleteById(id);
	}
}