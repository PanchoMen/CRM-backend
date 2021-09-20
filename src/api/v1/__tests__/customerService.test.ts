import CustomerService from '../services/customerService';
import CustomerRepository from '../repositories/customerRepository';
import ICustomer from '../models/customer/customerInterface';

const userId = '1';

const customer = { 
		_id: '2',
		name: 'John',
		surname: 'Doe',
		photo_field: '/static/customers/default_photo.png',
		created: { 
			user_id: userId, 
			date: new Date(),
		},
		lastModified: { 
			user_id: userId, 
			date:  new Date(), 
		}
	};

const customerRepositoryMock: Partial<CustomerRepository> = {
  create: jest.fn(),
  findOne: jest.fn().mockImplementation(() => {return customer}),
  findById: jest.fn().mockImplementation(() => {return customer}),
  findAll: jest.fn().mockImplementation(() => {return []}),
  deleteById: jest.fn(),
  save: jest.fn()
};

describe('CustomerService', () => {
	const customerService = new CustomerService(customerRepositoryMock as any);

	describe('create', () => {
		it('should call to create on CustomerRepository', async () => {
			await customerService.create(userId, customer as ICustomer);

			expect(customerRepositoryMock.create).toHaveBeenCalledWith(customer);
		});
	})

	describe('listAll', () => {
		it('should call to findAll on CustomerRepository', async () => {
			await customerService.listAll();

			expect(customerRepositoryMock.findAll).toHaveBeenCalled();
		});
	})

	describe('getById', () => {
		it('should call to findById on CustomerRepository', async () => {
			await customerService.getById(userId);

			expect(customerRepositoryMock.findById).toHaveBeenCalledWith(userId);
		});
	})

	describe('update', () => {
		it('should call to findById on CustomerRepository', async () => {
			await customerService.update(userId, customer._id, customer);

			expect(customerRepositoryMock.findById).toHaveBeenCalledWith(customer._id);
		});

		it('should call to save on CustomerRepository', async () => {
			await customerService.update(userId, customer._id, customer);

			expect(customerRepositoryMock.save).toHaveBeenCalled();
		});
	})

	describe('delete', () => {
		it('should call to deleteById on CustomerRepository', async () => {
			await customerService.delete(customer._id);

			expect(customerRepositoryMock.deleteById).toHaveBeenCalledWith(customer._id);
		});
	})

	describe('uploadImage', () => {
		it('should call to findById on CustomerRepository', async () => {
			await customerService.update(userId, customer._id, customer);

			expect(customerRepositoryMock.findById).toHaveBeenCalledWith(customer._id);
		});

		it('should call to save on CustomerRepository', async () => {
			await customerService.update(userId, customer._id, customer);

			expect(customerRepositoryMock.save).toHaveBeenCalled();
		});
	})
})