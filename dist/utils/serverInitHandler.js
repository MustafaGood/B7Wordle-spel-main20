"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Start the express server and catch error then exit
 * @param app Express app instance
 */
const serverInitHandler = (app) => {
    const port = 5080; // Use PORT environment variable or default to 5080
    app.listen(port, () => {
        console.log(`Development environment started listening to port ${port}`);
    }).on('error', (err) => {
        console.error('Server initialization error:', err.message);
        process.exit(1); // Exit with non-zero code to indicate error
    });
};
exports.default = serverInitHandler;
