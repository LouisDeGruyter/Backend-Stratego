import express from 'express';
import {Express} from 'express';
import type { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';
import 'express-async-errors';
const RankService = require('./rank.service');

const RankRouter = express.Router();

RankRouter.get('/', async (req: Request, res: Response) => {
    
        const ranks = await RankService.getAllRanks();
        return res.status(200).json(ranks);
}
);

RankRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const rank = await RankService.getRankById(id);
    return res.status(200).json(rank);
}
);

RankRouter.post('/',
    body('rankName').isString(),
    body('rankValue').isNumeric(),
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
    body('rankName').isString(),
    body('rankValue').isNumeric(),
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

RankRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    await RankService.deleteRank(id);
    return res.status(204).end();
}
);


export default function installRank(app: Express) {
    app.use('/api/ranks', RankRouter);
  }
  

    