import { NextFunction, Request, Response } from 'express';
import AppError from '../utility/appError';
import Logger, { logger } from '../utility/logger';

const sendErrorDev = (err: Error, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: Error, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

const handleCastErrorDB = (err: Error) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: Error) => {
  const field = Object.values(err.keyValue)[0];
  const value = Object.keys(err.keyValue)[0];

  const message = `Duplicate value for field: ${field}, value: ${value}.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: Error) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export = (err: Error, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error: Error = Object.assign(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    sendErrorProd(error, res);
  }

  if (err.statusCode.toString().startsWith('5')) {
    logger.error(new Logger(err.status, err.statusCode, err.message).log());
  } else {
    logger.debug(new Logger(err.status, err.statusCode, err.message).log());
  }
};
