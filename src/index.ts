import 'reflect-metadata';
import express,{ NextFunction, Request, Response } from 'express';
import './database/connect';
import userRoutes from './routes/userRouter';
import requisitionRouter from './routes/requisitionRouter';
import morgan from 'morgan';
import 'express-async-errors';
import AppError from './shared/error/Error';


const app = express();

const cors = require('cors');

app.use(cors());
 
app.use(morgan('dev'));
app.use(express.json());

app.use(userRoutes);
app.use(requisitionRouter);
app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          status: 'error',
          message: error.message,
        });
      }
  
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );

app.listen(8080, () => console.log('Server started'));