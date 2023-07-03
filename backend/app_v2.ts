import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes/routes';

const app_v2 = express();

app_v2.use(cors());
app_v2.use(express.json());
// eslint-disable-next-line no-undef
app_v2.use(express.static(path.join(__dirname, 'public')));
app_v2.use('/', routes);

export default app_v2;