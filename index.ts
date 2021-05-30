import dotenv from 'dotenv';
import 'reflect-metadata';
import express,{ NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import './src/database/connect';
import userRoutes from './src/routes/userRouter';
import indexRoutes from './src/routes/index';
import justificationRoutes from './src/routes/justificationRouter';
import requisitionRouter from './src/routes/requisitionRouter';
import morgan from 'morgan';

dotenv.config();

const app = express();

const cors = require('cors');

app.use(cors());
 

app.use(morgan('dev'));
app.use(express.json());
app.use(userRoutes);
app.use(requisitionRouter);
app.use(justificationRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, () => console.log('Server started'));