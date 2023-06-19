import express from 'express';
import {Express} from 'express';
import type { Request, Response } from 'express';
import { body, validationResult, param } from 'express-validator';
import 'express-async-errors';
import * as RankService from './rank.service';


const RankRouter = express.Router();

RankRouter.get('/',
 async (req: Request, res: Response) => {
    
        const ranks = await RankService.getAllRanks();
        return res.status(200).json(ranks);
}
);

RankRouter.get('/:id',
param('id').isInt().toInt().withMessage('id must be an integer'),
 async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const rank = await RankService.getRankById(id);
    return res.status(200).json(rank);
}
);

RankRouter.post('/',
body('rankName').isString().withMessage('rankName must be a string').notEmpty().withMessage('rankName must not be empty'),
body('rankValue').isNumeric().withMessage('rankValue must be a number').notEmpty().withMessage('rankValue must not be empty'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const rank = await RankService.createRank(req.body);
        return res.status(201).json(rank);
    }
);

RankRouter.put('/:id',
param('id').isInt().toInt().withMessage('id must be an integer'),
body('rankName').isString().withMessage('rankName must be a string').notEmpty().withMessage('rankName must not be empty'),
  body('rankValue').isNumeric().withMessage('rankValue must be a number').notEmpty().withMessage('rankValue must not be empty'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const id:number = parseInt(req.params.id,10);
        const rank = await RankService.updateRank(id, req.body);
        return res.status(200).json(rank);
    }
);

RankRouter.delete('/:id',
param('id').isInt().toInt().withMessage('id must be an integer'),
async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    await RankService.deleteRank(id);
    return res.status(204).end();
}
);


export default function installRank(app: Express):void {
    app.use('/api/ranks', RankRouter);
  }
  

    