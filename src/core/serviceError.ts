const NOT_FOUND = 'NOT_FOUND';
const VALIDATION_FAILED = 'VALIDATION_FAILED';
const UNAUTHORIZED = 'UNAUTHORIZED';
const FORBIDDEN = 'FORBIDDEN';
const BAD_REQUEST = 'BAD_REQUEST';

class ServiceError extends Error {
  code: string;
  details: any;

  constructor(code: string, message: string, details: any = {}) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = 'ServiceError';
  }

  static notFound(message: string, details: any) {
    return new ServiceError(NOT_FOUND, message, details);
  }

  static validationFailed(message: string, details: any) {
    return new ServiceError(VALIDATION_FAILED, message, details);
  }

  static unauthorized(message: string, details: any) {
    return new ServiceError(UNAUTHORIZED, message, details);
  }

  static forbidden(message: string, details: any) {
    return new ServiceError(FORBIDDEN, message, details);
  }

  static badRequest(message: string, details: any) {
    return new ServiceError(BAD_REQUEST, message, details);
  }

  get badRequest(): boolean {
    return this.code === BAD_REQUEST;
  }

  get isNotFound(): boolean {
    return this.code === NOT_FOUND;
  }

  get isValidationFailed(): boolean {
    return this.code === VALIDATION_FAILED;
  }

  get isUnauthorized(): boolean {
    return this.code === UNAUTHORIZED;
  }

  get isForbidden(): boolean {
    return this.code === FORBIDDEN;
  }

  get status(): number {
    if(this.isNotFound) {
      return 404;
    }
    if(this.isValidationFailed) {
      return 400;
    } 
    if(this.isUnauthorized) {
      return 401;
    }
    if(this.isForbidden) {
      return 403;
    }
    return 500;
  }
}

export default ServiceError;
