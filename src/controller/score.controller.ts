import { Request, Response, NextFunction } from 'express';
import Score, { IScore } from '../models/score.model'; // Assuming IScore interface is defined in score.model.ts

export const getScoreHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: IScore[] = await Score.find({});

        return res.status(200).json({
            message: 'Scores retrieved successfully',
            success: true,
            data,
        });
    } catch (err: any) {
        const error: any = new Error(err.message);
        error.statusCode = 500; // Setting a custom status code
        return next(error);
    }
};

export const postScoreHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { Name, startTime, endTime, guesses, score, letterCount, letterRepeat } = req.body;

        if (!Name || !startTime || !endTime || !guesses || !score || !letterCount || !letterRepeat) {
            const error: any = new Error('Missing required fields');
            error.statusCode = 400; // Setting a custom status code
            return next(error);
        }

        const data: IScore = await Score.create({
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
        
    } catch (err: any) {
        console.log(err);
        const error: any = new Error(err.message);
        error.statusCode = 500; // Setting a custom status code
        return next(error);
    }
};
