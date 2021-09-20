import { Document, Model, FilterQuery, UpdateQuery } from "mongoose";
import { ObjectId, OptionalId } from "mongodb";

export default class BaseRepository<T extends Document> {
	readonly model: Model<T>;

	constructor(model: Model<T>) {
		this.model = model;
	}

	private toObjectIdFilter(id: string): FilterQuery<T> {
    	return { _id: new ObjectId(id) as any };
	}

	async create(model: OptionalId<T>) {
		return await this.model.create(model);
  	}

	async deleteById(id: string) {
		return await this.model.deleteOne(this.toObjectIdFilter(id));
  	}

	async findAll(limit: number = 0) {
		return await this.model.find().limit(limit);
	}

	async findOne(query: FilterQuery<T>) {
		return await this.model.findOne(query)
	}

	async findById(id: string) {
		return await this.model.findOne(this.toObjectIdFilter(id));
	}

	async save(model: OptionalId<T>) {
		return await model.save();
	}
}