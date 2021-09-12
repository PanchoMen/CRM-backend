import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.set('port', process.env.PORT || 3001);

app.use(morgan('combined'));
app.use(express.json());

app.use('/static', express.static('/public'));

app.get('/', async (req, res) => {
  res.json('OK');
});

app.listen(app.get('port'), () => console.log(`Listen on port ${app.get('port')}`));
