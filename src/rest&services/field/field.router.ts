import express from 'express';
import type { Request, Response, Express } from 'express';
import { body, param, validationResult } from 'express-validator';
import 'express-async-errors';
import * as FieldService from './field.service';

const FieldRouter = express.Router();

FieldRouter.get('/', async (req: Request, res: Response) => {
  const fields = await FieldService.getAllFields();
  return res.status(200).json(fields);
});

FieldRouter.get('/:id',
  param('id').isInt().toInt().withMessage('id must be an integer'),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const field = await FieldService.getFieldById(id);
    return res.status(200).json(field);
  }
);

FieldRouter.post('/',
  body('fieldName').isString().withMessage("fieldName must be a string").notEmpty().withMessage('fieldName must not be empty'),
  body('fieldType').isString().withMessage("fieldType must be a string").notEmpty().withMessage('fieldType must not be empty'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const field = await FieldService.createField(req.body);
    return res.status(201).json(field);
  }
);

FieldRouter.put(
  '/:id',
  param('id').isInt().toInt().withMessage('id must be an integer'),
  body('fieldName').isString().withMessage('fieldName must be a string').notEmpty().withMessage('fieldName must not be empty'),
  body('fieldType').isString().withMessage('fieldType must be a string').notEmpty().withMessage('fieldType must not be empty'),
  async (req: Request, res: Response) => {
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
  param('id').isInt().toInt().withMessage('id must be an integer'),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    await FieldService.deleteField(id);
    return res.status(204).end();
  }
);

FieldRouter.get('/fieldsquares/:id',
  param('id').isInt().toInt().withMessage('id must be an integer'),
  async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const field = await FieldService.getAllFieldSquaresByFieldId(id);
    return res.status(200).json(field);
  }
);

export default function installField(app: Express):void {
  app.use('/api/fields', FieldRouter);
}
