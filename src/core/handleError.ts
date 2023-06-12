import { Request, Response, NextFunction } from 'express';
import ServiceError from './serviceError';

function handleError(
    err: typeof ServiceError|TypeError,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let customError = err;
    if (!(err instanceof ServiceError)) {
        customError = ServiceError.badRequest("Bad request ", err);
    }
    // we are not using the next function to prvent from triggering
  // the default error-handler. However, make sure you are sending a
  // response to client to prevent memory leaks in case you decide to
  // NOT use, like in this example, the NextFunction .i.e., next(new Error())
  res.status((customError as ServiceError).status).send(customError);
};
export default handleError
        
