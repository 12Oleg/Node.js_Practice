import express from 'express';
import routes from './routes';

const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`You can access the server at http://localhost:${PORT}`);
});
