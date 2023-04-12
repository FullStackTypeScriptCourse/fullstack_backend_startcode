import * as log4js from 'log4js';

export default class Logger {
  status: string;
  statusCode: number;
  message: string;

  constructor(status: string, statusCode: number, message: string) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
    console.log(this.log());
  }

  log() {
    return `Status: ${this.status} Status Code: ${this.statusCode} Message: ${this.message}`;
  }
}

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: `${__dirname}/app.log` }
  },
  categories: {
    default: { appenders: ['out', 'app'], level: 'debug' }
  }
});

export const logger = log4js.getLogger('default');
