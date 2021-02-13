import express from 'express';
import './database/index';
import userRoutes from "./routes/user_routes";
import requisitionRoutes from './routes/requisition_routes'

import 'reflect-metadata';

import morgan from 'morgan';

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use('/create', requisitionRoutes);
app.use('/users', userRoutes);

app.listen(3000, () => {

    console.log('Servidor rodando na porta 3000');
});