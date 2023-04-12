namespace Express {
  interface Request {
    requestTime?: string;
  }
}

interface Error {
  statusCode: number;
  status: string;
  path: string;
  value: string;
  code: number;
  stringValue: string;
  keyValue: string;
  errors: {
    name: {
      message: string;
    };
  };
  isOperational?: boolean;
}

