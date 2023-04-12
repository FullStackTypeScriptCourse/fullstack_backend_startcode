import { logger } from './logger';

export = () => {
  process.on('unhandledRejection', (reason: Error, promise) => {
    logger.error(
      'Unhandled Rejection at:',
      promise.catch,
      'reason:',
      reason.name,
      reason.message
    );
    // logic 
  });
};
