/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleMongooseValidationError';
import handleCastError from '../errors/hanldeCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  //  setting default value
  let statusCode: number = 500;
  let message = 'Something went wrong!';

  let errorSources: TErrorSources = [
    {
      path: '',
      message: '' || 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const errors = handleZodError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorSources = errors?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const errors = handleValidationError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorSources = errors?.errorSources;
  } else if (error?.name === 'CastError') {
    const errors = handleCastError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorSources = errors?.errorSources;
  } else if (error?.code === 11000) {
    const errors = handleDuplicateError(error);
    statusCode = errors?.statusCode;
    message = errors?.message;
    errorSources = errors?.errorSources;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: '',
        message: error.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSources = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};
