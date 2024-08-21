"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
/**
 * Express server middleware
 * @param app express app
 */
const expressMiddleWareHandler = (app) => {
    app.use(body_parser_1.default.json());
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use((0, morgan_1.default)('common'));
};
exports.default = expressMiddleWareHandler;
