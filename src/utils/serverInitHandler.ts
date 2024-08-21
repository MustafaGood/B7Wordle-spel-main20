import { Express } from 'express';

/**
 * Start the express server and catch error then exit
 * @param app Express app instance
 */
const serverInitHandler = (app: Express) => {
  const port =  5080; // Use PORT environment variable or default to 5080

  app.listen(port, () => {
    console.log(`Development environment started listening to port ${port}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    console.error('Server initialization error:', err.message);
    process.exit(1); // Exit with non-zero code to indicate error
  });
};

export default serverInitHandler;
