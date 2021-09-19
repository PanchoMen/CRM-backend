import dotenv from 'dotenv';

class Env {
	constructor(){}

	loadEnvironment(){
		const envLoadResult = dotenv.config();
		if (envLoadResult.error) {
			console.log('Error while load env');
			process.exit();
		}
		checkRequiredVariables();
	}
}

// CHECK ENV VARIABLES
function checkRequiredVariables() {
	if(process.env.JWT_SECRET == null){
		console.log('Error: JWT_SECRET is not defined in env');
		process.exit();
	}
	
	if(process.env.DB_URI == null){
		console.log('Error: DB_URI is not defined in env');
		process.exit();
	}

	if(process.env.DB_USER == null){
		console.log('Error: DB_USER is not defined in env');
		process.exit();
	}

	if(process.env.DB_PASSWORD == null){
		console.log('Error: DB_PASSWORD is not defined in env');
		process.exit();
	}

	if(process.env.PORT == null){
		console.log('PORT is not defined in env, using defaults');
	}

	if(process.env.STATIC_PATH == null){
		process.env.STATIC_PATH = '/public';
		console.log('STATIC_PATH is not defined in env, using defaults');
	}
}

export {Env}