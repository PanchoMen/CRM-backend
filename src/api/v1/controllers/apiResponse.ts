export default class ApiResponse {
	private result: boolean;
	private data?: any;
	private message?: string;

	constructor(result: boolean, message?: string, data?: any){
		this.result = result;
		this.data = data;
		this.message = message;
	}
}