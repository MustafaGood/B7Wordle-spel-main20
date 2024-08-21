import { Express, Router } from 'express';
import scoreRoutHandler from './score.routes'; // Assuming this is a TypeScript file
import wordRoutHandler from './word.routes'; // Assuming this is a TypeScript file
import express from 'express';
import path from 'path';

/**
 * Route handler to add routes to the Express application
 * @param app Express app instance
 */
const expressRouteHandler = (app: Express) => {
  const router = Router();
  
  // API versioning
  app.use('/v1', router);
  
  // Register route handlers
  wordRoutHandler(router);
  scoreRoutHandler(router);


  app.use(express.static(path.join(__dirname, '../../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
  });
};

export default expressRouteHandler;
