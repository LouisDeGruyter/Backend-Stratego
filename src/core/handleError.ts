import { Request, Response, NextFunction } from 'express';
import ServiceError from './serviceError';
import { getLogger } from './logging';

function handleError(
  err: ServiceError | TypeError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let customError: ServiceError;
  console.log(err);
  if (err instanceof ServiceError) {
    customError = err;
  } else {
    customError = ServiceError.badRequest('Bad request', err);
  }
  
  const errorBody = {
    message: customError.message,
    status: customError.status,
    stack: customError.stack,
  };

  // Log the error using the Winston logger
  getLogger().error(customError.message, { error: customError });

  res.status(customError.status).send(errorBody);
}

export default handleError;
