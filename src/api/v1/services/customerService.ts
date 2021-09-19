import fs from 'fs';
import { UploadedFile }  from 'express-fileupload';
import ICustomer, { IPartialCustomer } from '../models/customer/customerInterface';
import CustomerRepository from '../repositories/customerRepository';

export default class CustomerService {
		private readonly PATH = '/customers';
	private repository: CustomerRepository;

  	constructor(repository: CustomerRepository) {
    	this.repository = repository;
  	}

	async create(userId: string, customer: ICustomer){
		customer.created = { user_id: userId, date: new Date() };
		customer.photo_field = this.constructPath(['default_photo.png'], '/static' + this.PATH);
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
		this.markModified(userId, customer);
		return await this.repository.save(customer);
	}

	async delete(id: string) {
		return await this.repository.deleteById(id);
	}

	async uploadImage(userId: string, customerId: string, image: UploadedFile){
		const customer = await this.repository.findById(customerId);
		if(!customer){
			throw new Error("Invalid customer");
		}
		let basePath = process.env.STATIC_PATH + this.PATH;
		let internalPath = this.constructPath([customerId, 'photo'], basePath);
		customer.photo_field = this.constructPath([customerId, 'photo', image.name], '/static' + this.PATH);
		this.markModified(userId, customer);
		this.createDirIfNotExists(internalPath);
		await image.mv(this.constructPath([image.name], internalPath));
		await this.repository.save(customer);
		return customer.photo_field;
	}

	private constructPath(dirs: string[], base: string){
		return dirs.reduce((path,dir) => path + '/' + dir, base);
	}

	private createDirIfNotExists(path: string) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path, { recursive: true });
		}
	}

	private markModified(userId: string, customer: ICustomer){
		customer.lastModified = { user_id: userId, date: new Date() };
	}
}