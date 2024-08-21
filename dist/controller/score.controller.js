"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postScoreHandler = exports.getScoreHandler = void 0;
const score_model_1 = __importDefault(require("../models/score.model")); // Assuming IScore interface is defined in score.model.ts
const getScoreHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield score_model_1.default.find({});
        return res.status(200).json({
            message: 'Scores retrieved successfully',
            success: true,
            data,
        });
    }
    catch (err) {
        const error = new Error(err.message);
        error.statusCode = 500; // Setting a custom status code
        return next(error);
    }
});
exports.getScoreHandler = getScoreHandler;
const postScoreHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, startTime, endTime, guesses, score, letterCount, letterRepeat } = req.body;
        if (!Name || !startTime || !endTime || !guesses || !score || !letterCount || !letterRepeat) {
            const error = new Error('Missing required fields');
            error.statusCode = 400; // Setting a custom status code
            return next(error);
        }
        const data = yield score_model_1.default.create({
            Name,
            startTime,
            endTime,
            guesses,
            score,
            letterCount,
            letterRepeat,
        });
        return res.status(201).json({
            message: 'New score has been added',
            success: true,
            data,
        });
    }
    catch (err) {
        console.log(err);
        const error = new Error(err.message);
        error.statusCode = 500; // Setting a custom status code
        return next(error);
    }
});
exports.postScoreHandler = postScoreHandler;
