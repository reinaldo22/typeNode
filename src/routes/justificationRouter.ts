import JustificationController from '../controller/justificationController/justificationController';
import { isDoctor, verifyToken } from './../middlewares/authJWT';
import { Router } from 'express';

const routes = Router();

routes.post('/justification', [verifyToken, isDoctor], JustificationController.createJustification);

export default routes;