import express from 'express';
import morgan from 'morgan';
import compress from 'compression';
import helmet from 'helmet';

/**
 * Express instance
 * @public
 */
const app = express();

// secure apps by setting various HTTP headers
app.use(helmet());

// gzip compression
app.use(compress());

// request logging. dev: console | production: file
app.use(morgan(process.env.NODE_ENV ? 'combined' : 'dev'));

// Serve the static files from the build folder
app.use(express.static(`${__dirname}/build`));

// Redirect all traffic to the index
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/build/index.html`);
});

// Listen to port 3000
app.listen(process.env.PORT || 3000);
