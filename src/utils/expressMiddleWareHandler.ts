import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Application } from 'express';

/**
 * Express server middleware
 * @param app express app
 */
const expressMiddleWareHandler = (app: Application): void => {
  app.use(bodyParser.json());
  app.use(cors({ origin: '*' }));
  app.use(morgan('common'));
};

export default expressMiddleWareHandler;
