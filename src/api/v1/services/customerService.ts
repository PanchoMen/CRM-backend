import ICustomer from '../models/customer/customerInterface';
import CustomerRepository from '../repositories/customerRepository';

export default class CustomerService {
	private repository: CustomerRepository;

  	constructor(repository: CustomerRepository) {
    	this.repository = repository;
  	}

	async create(customer: ICustomer){
		return new Promise((resolve, reject) => {
			this.repository.create(customer)
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
	}
}