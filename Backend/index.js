/*==============================
core packages
==============================*/
import express from 'express';
import 'dotenv/config';

/*==============================
security and application Logging packages
==============================*/
import cors from 'cors';
import log from "morgan";
import rateLimiter from "./middlewares/rateLimiter.js";
import helmet from "helmet";  

/*==============================
http & https Server
==============================*/
import http from "http";
// import https from "https"; // for production use

/*==============================
include middlewares, custom middlewares, Routes and Database connection
==============================*/
import apiRoutes from "./routes/index.js";
import DBConnect from './config/db.js';
import constants from "./config/constants.js"
import logger from "./config/logger.js"
import ErrorHandler from './middlewares/ApiErrorHandler.js';
import HttpsRequestOnly from "./middlewares/HttpsRequestOnly.js";

/*==============================
include Environment variables
==============================*/
const { PORT } = process.env;

/*==============================
Serevr Application  Configurations
==============================*/

DBConnect();                 
const app = express();
app.use(express.json());
app.use(cors(constants.corsOption));
app.use(rateLimiter);
app.use(log("tiny",logger.access));
app.use(log("combined",logger.error));
app.use(helmet()); 
app.use(HttpsRequestOnly); 

/*==============================
routes, not found and custom api error handler
==============================*/
app.use("/app/",apiRoutes);
app.use(ErrorHandler);  

/*==============================
create http (development) server instance
==============================*/
const httpServer = http.createServer(app);
// We Can also use https for (production) 

/*==============================
start server listen
==============================*/
httpServer.listen( PORT,() => console.log(`Server Running on ${PORT}`));
