export default class ApiResponse {
	private status: boolean;
	private data?: any;
	private message?: string;

	constructor(status: boolean, message?: string, data?: any){
		this.status = status;
		this.data = data;
		this.message = message;
	}
}