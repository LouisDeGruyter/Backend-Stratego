import express from 'express';
import type { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';
const FieldService = require('./field.service');

const FieldRouter = express.Router();

FieldRouter.get('/', async (req: Request, res: Response) => {
        
            const fields = await FieldService.getAllFields();
            return res.status(200).json(fields);
    }
);

FieldRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const field = await FieldService.getFieldById(id);
    return res.status(200).json(field);
}
);

FieldRouter.post('/',
    body('fieldName').isString(),
    body('fieldType').isString(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const field = await FieldService.createField(req.body);
        return res.status(201).json(field);
    }
);

FieldRouter.put('/:id',
    body('fieldName').isString(),
    body('fieldType').isString(),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const id:number = parseInt(req.params.id,10);
        const field = await FieldService.updateField(id, req.body);
        return res.status(200).json(field);
    }
);

FieldRouter.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    await FieldService.deleteField(id);
    return res.status(204).end();
}
);

FieldRouter.get('/fieldsquares/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const field = await FieldService.getAllFieldSquaresByFieldId(id);
    return res.status(200).json(field);
}
);

module.exports = (app: any) =>
app.use('/api/fields', FieldRouter);

