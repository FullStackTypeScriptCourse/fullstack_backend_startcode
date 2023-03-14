import * as dotenv from 'dotenv'
dotenv.config({path:'./config.env'});
import express = require("express");
import morgan = require('morgan');
import logger from "./utility/logger";


const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log("Development mode...");
}

app.use(express.json()); // Body parser for JSON data
app.use(express.static(`${__dirname}/public`)); // Serve static files


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
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
