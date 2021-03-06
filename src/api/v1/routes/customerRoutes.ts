import { Router } from 'express';
import CustomerController from '../controllers/customerController';
import AuthenticationMiddleware from '../../../middlewares/authentication';

export default class CustomerRoutes {
	private readonly router : Router;

	constructor(controller: CustomerController, authMiddleware: AuthenticationMiddleware){
		this.router = Router();
		
		// Endpoints only for authenticated users
		this.router.use((req, res, next) => authMiddleware.verifyAuthentication(req, res, next));
		
		this.router.post('/', (req, res) => controller.create(req, res));
		this.router.post('/:id/photo', (req, res) => controller.updloadImage(req, res));
		this.router.get('/list', (req, res) => controller.list(req, res));
		this.router.get('/:id', (req, res) => controller.getByID(req, res));
		this.router.put('/:id', (req, res) => controller.update(req, res));
		this.router.delete('/:id', (req, res) => controller.delete(req, res));
	}

	public getRouter(){
		return this.router;
	}
}