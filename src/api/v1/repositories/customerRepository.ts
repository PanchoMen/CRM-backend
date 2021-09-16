import BaseRepository from './baseRepository';
import Customer  from '../models/customer/customerSchema';
import ICustomer from '../models/customer/customerInterface';

export default class CustomerRepository extends BaseRepository<ICustomer> {
	constructor() {
		super(Customer);
	}
}