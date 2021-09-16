import { Document, Model, FilterQuery } from "mongoose";
import { ObjectId, OptionalId } from "mongodb";

export default class BaseRepository<T extends Document> {
	private model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}

	private toObjectIdFilter(id: string): FilterQuery<T> {
    	return { _id: new ObjectId(id) as any };
	}

	async create(model: OptionalId<T>) {
		return new Promise((resolve, reject) => {
			this.model.create(model)
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
  	}

	async deleteById(id: string) {
		return new Promise((resolve, reject) => {
			this.model.deleteOne(this.toObjectIdFilter(id))
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
  	}

	async findAll(limit: number = 0): Promise<T[]> {
		return new Promise((resolve, reject) => {
		this.model
			.find()
			.limit(limit)
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
	}

	async findOne(query: FilterQuery<T>): Promise<T | null> {
		return new Promise((resolve, reject) => {
		this.model
			.findOne(query)
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
	}

	async findById(id: string): Promise<T | null> {
		return new Promise((resolve, reject) => {
		this.model
			.findOne(this.toObjectIdFilter(id))
			.then(result => resolve(result))
			.catch(err => reject(err));
		});
	}
}