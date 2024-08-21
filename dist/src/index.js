"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_js_1 = require("./utils/index.js");
const routes_js_1 = __importDefault(require("./routes/routes.js"));
const app = (0, express_1.default)();
// connect to mongodb
(0, index_js_1.expressConnectDB)();
// handle express middleware
(0, index_js_1.expressMiddleWareHandler)(app);
// handle express routes
(0, routes_js_1.default)(app);
// handle global errors
(0, index_js_1.expressGlobalErrorHandler)(app);
// handle express initialization
(0, index_js_1.serverInitHandler)(app);
exports.default = app;
