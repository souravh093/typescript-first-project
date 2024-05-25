/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode: number = 500;
  const message: any = error.message || 'Something went wrong!';

  return res.status(statusCode).json({
    success: false,
    message,
    error: error,
  });
};
