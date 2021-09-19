import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { DB , dbConfig} from './utils/database';
import { Env } from './utils/environment';
import API_V1 from './api/v1';

const env = new Env();
env.loadEnvironment();

const app = express();
app.set('port', process.env.PORT || 300);

app.use(morgan('combined'));

app.use(helmet());

app.use(express.json());

app.use('/static', express.static('/public'));

const api_v1 = new API_V1('/api/v1');
api_v1.setRoutes(app);

const db = new DB({
    URI: process.env.DB_URI,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD
});

db.connect()
.then(() => {
  app.listen(app.get('port'), () => console.log(`Listen on port ${app.get('port')}`));
})
.catch((error) => {
  console.error(error);
});
