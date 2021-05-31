import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import './database/connect';
import userRoutes from './routes/userRouter';
import justificationRouter from './routes/justificationRouter';
import requisitionRouter from './routes/requisitionRouter';
import morgan from 'morgan';
import 'express-async-errors';



const app = express();

const cors = require('cors');

app.use(cors());

app.use(morgan('dev'));
app.use(express.json());

app.use(userRoutes);
app.use(requisitionRouter);
app.use(justificationRouter);


app.listen(process.env.PORT, () => console.log('Server started'));