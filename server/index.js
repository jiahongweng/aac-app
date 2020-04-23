import config from 'dotenv';
import app from './config/express';

config.config();

const port = process.env.PORT || 8000;
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

app.listen(port, () => {
  console.log(`Server is running on PORT ${port} (${env})`);
});

/**
 * Exports express
 * @public
 */
export default app;
