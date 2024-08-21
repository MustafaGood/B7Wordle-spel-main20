"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const score_controller_1 = require("../controller/score.controller");
const scoreRoutHandler = (router) => {
    router.get('/score', score_controller_1.getScoreHandler);
    router.post('/score', score_controller_1.postScoreHandler);
};
exports.default = scoreRoutHandler;
