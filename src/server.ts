import express from 'express';
import 'express-async-errors';

import routes from './routes';
import { connectToDatabase } from './config/db';
import { handleErrors } from './middlewares/errorHandler';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

connectToDatabase()
  .then(() => {
    console.log('Database connection established');

    app.use(routes);

    app.use(handleErrors);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`You can access the server at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
