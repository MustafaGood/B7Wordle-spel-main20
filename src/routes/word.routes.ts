import { Router } from 'express';
import generateWordHandler from "../controller/word.controller.js";

const wordRoutHandler = (router: Router) => {
    router.post('/word', generateWordHandler);
};
  
export default wordRoutHandler;