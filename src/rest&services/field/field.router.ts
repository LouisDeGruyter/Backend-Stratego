import express from 'express';
import type { Request, Response,Express } from 'express';
import { body, param, validationResult } from 'express-validator';
import 'express-async-errors';
import * as FieldService  from './field.service'; // import named export instead of default export


const FieldRouter = express.Router();

FieldRouter.get('/', async (req: Request, res: Response) => {
    console.log(req.body); 
    const fields = await FieldService.getAllFields();
    return res.status(200).json(fields);
    }
);

FieldRouter.get('/:id',
param('id').isInt().toInt(),
async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const field = await FieldService.getFieldById(id);
    return res.status(200).json(field);
}
);

FieldRouter.post('/',
body('fieldName').isString().notEmpty().withMessage('fieldName must be a string and not empty'),
body('fieldType').isString().notEmpty().withMessage('fieldType must be a string and not empty'),
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        
        
        if(!errors.isEmpty()){
            
            return res.status(400).json({errors: errors.array()});
        }
        const field = await FieldService.createField(req.body);
        return res.status(201).json(field);
    }
);



FieldRouter.put(
  '/:id',
  param('id').isInt().toInt(),
  body('fieldName').isString().notEmpty().withMessage('fieldName must be a string and not empty'),
  body('fieldType').isString().notEmpty().withMessage('fieldType must be a string and not empty'),
    async (req: Request, res: Response) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(req.params.id, 10);
    const field = await FieldService.updateField(id, req.body);
    
    return res.status(200).json(field);
}
);


FieldRouter.delete('/:id',
    param('id').isInt().toInt(),
    async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    await FieldService.deleteField(id);
    return res.status(204).end();
}
);

FieldRouter.get('/fieldsquares/:id', 
    param('id').isInt().toInt(),
    async (req: Request, res: Response) => {
    const id = parseInt(req.params.id,10);
    const field = await FieldService.getAllFieldSquaresByFieldId(id);
    return res.status(200).json(field);
}
);
export default function installField(app: Express) {
    app.use('/api/fields', FieldRouter);
}

