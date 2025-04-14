import { Request, Response, NextFunction } from 'express';
import { BaseResponse } from '../domain/entity';
import BaseCustomError from '../errors/base-custom-error';

/**
 * Error handeling middleware
 * @param {Error} err - Error instance
 * @param {Response} res - Response
 * @param {NextFunction} _next - Next function to call
 * @return {Response<BaseResponse>}
 */
const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction): Response<BaseResponse> => {
  if (err instanceof BaseCustomError) {
    return res.status(err.getStatusCode()).send(err.serializeErrorOutput());
  }

  console.error(err)

  return res.status(500).send({
    error: 'Internal Server Error',
  });
};

export { errorHandler };
