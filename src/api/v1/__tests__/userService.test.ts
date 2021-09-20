import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import IUser from "../models/user/userInterface";
import { Role } from "../models/user/role";

const user = {
			_id: '1',
			username: 'jd',
			name: 'John',
		  	surname: 'Doe',
		  	email: 'john@gmail.com',
		  	password: '12345',
		  	lastLogin: new Date(),
			role: Role.Admin,
			created:  new Date(),
			lastModified:  new Date()
		} as IUser;

const userRepositoryMock: Partial<UserRepository> = {
  create: jest.fn(),
  findOne: jest.fn().mockImplementation(() => {return user}),
  findById: jest.fn().mockImplementation(() => {return user}),
  findAll: jest.fn().mockImplementation(() => {return []}),
  deleteById: jest.fn(),
  save: jest.fn()
};

describe('UserService', () => {
	const userService = new UserService(userRepositoryMock as any);

  	describe('create', () => {
		it('should call to create on UserRepository', async () => {
			await userService.create(user);

			expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
    	});
	});

	describe('listAll', () => {
		it('should call to findAll on UserRepository', async () => {
			await userService.listAll();

			expect(userRepositoryMock.findAll).toHaveBeenCalled();
    	});
	});

	describe('getById', () => {
		it('should call to findById on UserRepository', async () => {
			await userService.getById(user._id);

			expect(userRepositoryMock.findById).toHaveBeenCalledWith(user._id);
    	});
	});

	describe('changeRole', () => {
		it('should call to findById on UserRepository', async () => {
			await userService.changeRole(user._id, user.role);

			expect(userRepositoryMock.findById).toHaveBeenCalledWith(user._id);
    	});

		it('should call to save on UserRepository', async () => {
			await userService.changeRole(user._id, user.role);

			expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
    	});
	});

	describe('update', () => {
		it('should call to save on UserRepository', async () => {
			await userService.update(user._id, user);

			expect(userRepositoryMock.save).toHaveBeenCalledWith(user);
    	});
	});

	describe('delete', () => {
		it('should call to deleteById on UserRepository', async () => {
			await userService.delete(user._id);

			expect(userRepositoryMock.deleteById).toHaveBeenCalledWith(user._id);
    	});
	});
});