import * as http from 'http';
import Logger, { logger } from './logger';

export = (server?: http.Server) => {
  process.on('uncaughtException', (err: Error, origin) => {
    logger.error('Uncaught Exception!!', err.name, err.message, origin);

    if (server) {
      server.close(() => {
        logger.error('Uncaught Exception!! Shutting down...');
        process.exit(1);
      });
    }
  });
};
