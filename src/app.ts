/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'] }));

// application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const a: number = 10;
  res.send(a);
};

app.get('/test', test);

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Server is running...',
  });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
