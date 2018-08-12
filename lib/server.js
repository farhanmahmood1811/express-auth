'use strict';

import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import IndexRoutes from './routes/index';
import AuthRoutes from './routes/auth';
import ServiceRoutes from './routes/service';
import Config from './core/config';
import ConnectToDb from './core/connect'
import TokenVerofication from './middleware/tokenVerification';

ConnectToDb();

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${__dirname}/public`));

app.use('/', IndexRoutes);
app.use('/auth/', AuthRoutes);
app.use('/service', ServiceRoutes);

app.get('/user', TokenVerofication, (req, res) => {
  return res.json({username: req.user.username})
})

app.listen(Config.port, () => {
    console.log(`
      Port: ${Config.port}
      Env: ${app.get('env')}
    `);
});
  
export default app;