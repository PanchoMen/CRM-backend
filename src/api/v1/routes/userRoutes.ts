import { Router } from 'express';
import UserController from '../controllers/userController';
import AuthenticationMiddleware from '../../../middlewares/authentication';
import { Role } from '../models/user/role';

export default class UserRoutes {
	private readonly router : Router;

	constructor(controller: UserController, authMiddleware: AuthenticationMiddleware){
		this.router = Router();

		this.router.post('/login', (req, res) => controller.login(req, res));

		// Endpoints only for authenticated users
		this.router.use((req, res, next) => authMiddleware.verifyAuthentication(req, res, next));

		// Endpoints only for admins
		this.router.use((req, res, next) => authMiddleware.verifyRole(req, res, next, Role.Admin));

		this.router.post('/', (req, res) => controller.create(req, res));
		this.router.get('/list', (req, res) => controller.list(req, res));
		this.router.get('/:user-id', (req, res) => controller.get(req, res));
		this.router.put('/:user-id', (req, res) => controller.update(req, res));
		this.router.put('/:user-id/admin-status', (req, res) => controller.changeRole(req, res));
		this.router.delete('/:user-id', (req, res) => controller.delete(req, res));
	}

	public getRouter(){
		return this.router;
	}
}