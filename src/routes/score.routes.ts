import { Router } from 'express';
import { getScoreHandler, postScoreHandler } from '../controller/score.controller';

const scoreRoutHandler = (router: Router) => {
  router.get('/score', getScoreHandler);
  router.post('/score', postScoreHandler);
};

export default scoreRoutHandler;
