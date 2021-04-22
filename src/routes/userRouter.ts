import { Router } from 'express';
import { verifyToken } from './../middlewares/authJWT';
import CreateDoctorController from '../controller/doctorController/createDoctor';
import LoginDoctorController from '../controller/doctorController/loginDoctor';
import Validate from '../controller/doctorController/Validate';
import CreateUserController from '../controller/userController/createUserController';
import EnableUserController from '../controller/userController/enableUserController';
import forgotPasswordController from '../controller/userController/forgotPasswordController';
import loginUserController from '../controller/userController/loginUserController';
import Activate from '../controller/doctorController/Activate';
const routes = Router();

routes.post('/signUp', CreateUserController.signUp);
routes.post('/doctorSignUp', CreateDoctorController.createDoctor);
routes.post('/validate', Validate.createValidate);
routes.get('/activate/:token',Activate.verifyActivate);
routes.post('/signInDoctor', LoginDoctorController.signInDoctor);
routes.post('/signIn', loginUserController.signIn);
routes.patch('/enable/:id', EnableUserController.enable);
routes.post('/emailUpdate', forgotPasswordController.forgotPassword);

export default routes;