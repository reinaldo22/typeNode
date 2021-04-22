import { Router } from 'express';
import { verifyToken } from './../middlewares/authJWT';
import CreateDoctorController from '../controller/doctorController/createDoctor';
import LoginDoctorController from '../controller/doctorController/loginDoctor';
import Validate from '../controller/doctorController/Validate';
import Activate from '../controller/doctorController/Activate';
const routes = Router();

routes.post('/doctorSignUp', CreateDoctorController.createDoctor);
routes.post('/validate', Validate.createValidate);
routes.get('/activate/:token',Activate.verifyActivate);
routes.post('/signInDoctor', LoginDoctorController.signInDoctor);


export default routes;