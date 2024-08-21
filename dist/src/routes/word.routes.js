"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_controller_js_1 = __importDefault(require("../controller/word.controller.js"));
const wordRoutHandler = (router) => {
    router.post('/word', word_controller_js_1.default);
};
exports.default = wordRoutHandler;
