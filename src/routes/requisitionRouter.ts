import { isDoctor, verifyToken } from './../middlewares/authJWT';
import { Router } from 'express';
import requisitionController from '../controller/requisitionController/requisitionController';
const routes = Router();


routes.post('/createRequisition', [verifyToken, isDoctor], requisitionController.requisition);

export default routes;