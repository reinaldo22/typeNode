import 'reflect-metadata';
import express from 'express';
import './database/connect';
import userRoutes from './routes/userRouter';
import requisitionRouter from './routes/requisitionRouter';
import morgan from 'morgan';


const app = express();

const cors = require('cors');

app.use(cors());
 
app.use(morgan('dev'));
app.use(express.json());

app.use(userRoutes);
app.use(requisitionRouter);


app.listen(8080, () => console.log('Server started'));