import { Express } from "express-serve-static-core";
import AuthenticationMiddleware from "../../middlewares/authentication";
import CustomerController from "./controllers/customerController";
import UserController from "./controllers/userController";
import CustomerRepository from "./repositories/customerRepository";
import UserRepository from "./repositories/userRepository";
import CustomerRoutes from "./routes/customerRoutes";
import UserRoutes from "./routes/userRoutes";
import CustomerService from "./services/customerService";
import UserService from "./services/userService";


export default class API_V1 {
	private readonly userRoutes: UserRoutes;
	private readonly customerRoutes: CustomerRoutes;
	private readonly userController: UserController;
	private readonly customerController: CustomerController;
	private readonly userService: UserService;
	private readonly customerService: CustomerService;
	private readonly userRepository: UserRepository;
	private readonly customerRepository: CustomerRepository;
	private readonly authenticationMiddleware: AuthenticationMiddleware;
	private readonly baseUrl: string;

	constructor(baseUrl: string){
		this.baseUrl = baseUrl
		this.userRepository = new UserRepository();
		this.userService = new UserService(this.userRepository);
		this.authenticationMiddleware = new AuthenticationMiddleware(this.userService);
		this.userController = new UserController(this.userService);
		this.userRoutes = new UserRoutes(this.userController, this.authenticationMiddleware);

		this.customerRepository = new CustomerRepository();
		this.customerService = new CustomerService(this.customerRepository);
		this.customerController = new CustomerController(this.customerService);
		this.customerRoutes = new CustomerRoutes(this.customerController, this.authenticationMiddleware);
	}

	setRoutes(app: Express){
		app.use(this.baseUrl + '/users', this.userRoutes.getRouter());
		app.use(this.baseUrl + '/customers', this.customerRoutes.getRouter());
	}
}