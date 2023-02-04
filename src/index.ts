import express from 'express';
import connect from './utils/connect';
import logger from './utils/logger';
import routes from './routes';
import deserializeUser from './middleware/deserializeUser';

const port = 9000;
const app = express();

app.use(express.json());
//app.use(cors({origin: 'http://localhost:4200'}))
app.use(deserializeUser);

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  await connect();
  routes(app);
});
