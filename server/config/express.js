import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import passport from 'passport';
import routes from '../routes/v1';
import errorHandler from '../middlewares/error.middleware';


/**
* Express instance
* @public
*/
const app = express();

// request logging. dev: console | production: file
app.use(morgan(process.env.NODE_ENV ? 'combined' : 'dev'));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Initialize passport.js
app.use(passport.initialize());

// mount api v1 routes
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(errorHandler.converter);

// catch 404 and forward to error handler
app.use(errorHandler.notFound);

// error handler, send stacktrace only during development
app.use(errorHandler.handler);

export default app;
