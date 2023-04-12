import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require("express");
import { NextFunction, Request, Response } from 'express';
import morgan = require('morgan');
import globalErrorHandler from './middleware/globalErrorHandler';
import AppError from './utility/appError';

// Create Express server
const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files

app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {

    res.status(200)
        .json({
            status: "success",
            message: "Hello World"
        })
});

app.post("/", (req, res) => {

    const jsonData = req.body;
    console.log()
    res.status(201)
        .json({
            status: "success",
            data: jsonData
        })
})

const port = process.env.PORT;
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);

export default app;