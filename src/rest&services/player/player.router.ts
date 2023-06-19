import express from 'express';
import type { Request, Response,Express } from 'express';
import { body, param, validationResult } from 'express-validator';
import 'express-async-errors';
import * as PlayerService  from './player.service'; // import named export instead of default export


const PlayerRouter = express.Router();

PlayerRouter.get('/', async (req: Request, res: Response) => {
    console.log(req.body); 
    const players = await PlayerService.getAllPlayers();
    return res.status(200).json(players);
    }
);

PlayerRouter.get('/:id',
param('id').isInt().toInt().withMessage('id must be an integer'),
async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const player = await PlayerService.getPlayerById(id);
    return res.status(200).json(player);
}
);

PlayerRouter.post('/',
body('playerName').isString().withMessage('playerName must be a string').notEmpty().withMessage('playerName must not be empty'),
body('playerType').isString().withMessage('playerType must be a string').notEmpty().withMessage('playerType must not be empty'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){  
            return res.status(400).json({errors: errors.array()});
        }
        const player = await PlayerService.createPlayer(req.body);
        return res.status(201).json(player);
    }
);


PlayerRouter.put('/:id',
param('id').isInt().toInt().withMessage('id must be an integer'),
body('playerName').isString().withMessage('playerName must be a string').notEmpty().withMessage('playerName must not be empty'),
body('playerType').isString().withMessage('playerType must be a string').notEmpty().withMessage('playerType must not be empty'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    const player = await PlayerService.updatePlayer(id, req.body);
    return res.status(200).json(player);
}
);

PlayerRouter.delete('/:id',
param('id').isInt().toInt().withMessage('id must be an integer'),
async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    await PlayerService.deletePlayer(id);
    return res.status(204).end();
}
);

export default function installPlayerRouter(app: Express):void {
    app.use('/api/players', PlayerRouter);
}

