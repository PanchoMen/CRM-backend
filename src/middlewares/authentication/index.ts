import { Request, Response } from 'express';
import { JwtPayload, verify } from "jsonwebtoken";
import ApiResponse from '../../api/v1/controllers/apiResponse';
import { Role } from '../../api/v1/models/user/role';
import IUser from '../../api/v1/models/user/userInterface';
import UserService from '../../api/v1/services/userService';

export default class AuthenticationMiddleware{
	private readonly userService: UserService;

	constructor(userService: UserService){
		this.userService = userService;
	}

	async verifyAuthentication(req: Request, res: Response, next: Function) {
		const token = this.getTokenFromHeader(req);
		if(token){
			const user = await this.getUserFromToken(token);
			if(user){
				res.locals.authenticated = true;
				res.locals.user = user;
				return next();
			}
		}
		return res.status(403).json(new ApiResponse(false, 'Bad credentials'));
	}

	async verifyRole(req: Request, res: Response, next: Function, role: Role = Role.User) {
		if(res.locals.user.role === role) {
			return next();
		}
		return res.status(403).json(new ApiResponse(false, 'Insufficient permissions'));
	}

	private getTokenFromHeader(req: Request): string | null {
		const autorization = req.headers['authorization'];
		if(autorization){
			return autorization.split(' ')[1]
		}else{
			return null;
		}
	}

	private async getUserFromToken(token: string): Promise<Partial<IUser> | null> {
		const secret = process.env.JWT_SECRET || 'secret';
		const decoded = this.getDecodedToken(token);
		if(decoded){
			return await this.userService.getById(decoded.id);
		}
		return null;
	}

	private getDecodedToken(token: string) {
		const secret = process.env.JWT_SECRET || 'secret';
		try {
			return verify(token, secret)  as JwtPayload;
		} catch (err) {
			return null;
		}
	}
}