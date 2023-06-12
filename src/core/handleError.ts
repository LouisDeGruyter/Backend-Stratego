import { Request, Response, NextFunction } from 'express';
import ServiceError from './serviceError';

function handleError(
  err: ServiceError | TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError: ServiceError;

  if (err instanceof ServiceError) {
    customError = err;
  } else {
    customError = ServiceError.badRequest('Bad request', err);
  }
  const errorbody = {
    message: customError.message,
    status: customError.status,
    stack: customError.stack,
  }
  res.status(customError.status).send(errorbody);
}

export default handleError;
