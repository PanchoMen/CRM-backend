import express from 'express';
import morgan from 'morgan';
import { DB } from './utils/database';
import { Env } from './utils/environment';
import UserRoutes from './api/v1/routes/userRoutes';
import CustomerRoutes from './api/v1/routes/CustomerRoutes';

const env = new Env();
env.loadEnvironment();

const app = express();
const v1_user = new UserRoutes();
const v1_customer = new CustomerRoutes();

app.set('port', process.env.PORT || 300);

app.use(morgan('combined'));

app.use(express.json());

app.use('/static', express.static('/public'));

app.use('/v1/user', v1_user.getRouter());
app.use('/v1/customer', v1_customer.getRouter());

const dbConfig = {
    URI: process.env.DB_URI,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD
};

const db = new DB(dbConfig);

db.connect()
.then(() => {
  app.listen(app.get('port'), () => console.log(`Listen on port ${app.get('port')}`));
})
.catch((error) => {
  console.error(error);
});
