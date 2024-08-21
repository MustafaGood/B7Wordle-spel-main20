import { Request, Response, NextFunction } from 'express';
import getRandomWord, { stringToBool } from '../utils/getRandomWord';

/**
 * Get a random word handler
 * @param req Request object
 * @param res Response object
 * @param next Next function
 */
const generateWordHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { letterCount, repeated } = req.body;

        if (!letterCount || !repeated) {
            const error: any = new Error('Missing required fields');
            error.statusCode = 400; // Setting a custom status code
            return next(error);
        }

        const word: string = await getRandomWord(letterCount, stringToBool(repeated));
        console.log(word);
        res.status(200).json({ word, success: true });
    } catch (err: any) {
        const error: any = new Error(err.message);
        error.statusCode = 500; // Setting a custom status code
        return next(error);
    }
}

export default generateWordHandler;
