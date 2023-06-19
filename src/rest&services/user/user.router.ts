import express from 'express';
import type { Request, Response, Express } from 'express';
import { body, param, validationResult } from 'express-validator';
import 'express-async-errors';
import * as UserService from './user.service';

const UserRouter = express.Router();

UserRouter.get('/',
    async (req: Request, res: Response) => {
        const users = await UserService.getAllUsers();
        return res.status(200).json(users);
    }
);

UserRouter.get('/:id',
    param('id').isInt().toInt().withMessage('id must be an integer'),
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const user = await UserService.getUserById(id);
        return res.status(200).json(user);
    }
);

UserRouter.post('/',
    // body('userName').isString().withMessage('userName must be a string').notEmpty().withMessage('userName must not be empty'),
    // body('password').isString().withMessage('password must be a string').notEmpty().withMessage('password must not be empty'),
    // body('email').isString().withMessage('email must be a string').notEmpty().withMessage('email must not be empty'),
    body('rankId').isInt().toInt().withMessage('rankId must be an integer'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const user = await UserService.createUser(req.body);
        return res.status(201).json(user);
    }
);

UserRouter.put('/:id',
    param('id').isInt().toInt().withMessage('id must be an integer'),
    // body('userName').isString().withMessage('userName must be a string').notEmpty().withMessage('userName must not be empty'),
    // body('password').isString().withMessage('password must be a string').notEmpty().withMessage('password must not be empty'),
    // body('email').isString().withMessage('email must be a string').notEmpty().withMessage('email must not be empty'),
    body('rankId').isInt().toInt().withMessage('rankId must be an integer'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        const id: number = parseInt(req.params.id, 10);
        const user = await UserService.updateUser(id, req.body);
        return res.status(200).json(user);
    }
);

UserRouter.delete('/:id',
    param('id').isInt().toInt().withMessage('id must be an integer'),
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        await UserService.deleteUser(id);
        return res.status(204).end();
    }
);

export default function (app: Express):void {
    app.use('/api/users', UserRouter);
}
