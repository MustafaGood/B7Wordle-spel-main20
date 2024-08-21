"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomWord_1 = __importStar(require("../utils/getRandomWord"));
/**
 * Get a random word handler
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
const generateWordHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { letterCount, repeated } = req.body;
        if (!letterCount || !repeated) {
            const error = new Error('Missing required fields');
            error.statusCode = 400; // Setting a custom status code
            return next(error);
        }
        const word = yield (0, getRandomWord_1.default)(letterCount, (0, getRandomWord_1.stringToBool)(repeated));
        console.log(word);
        res.status(200).json({ word, success: true });
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500; // Setting a custom status code
        return next(error);
    }
});
exports.default = generateWordHandler;
