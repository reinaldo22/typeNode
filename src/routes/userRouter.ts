import { Router } from 'express';
import { isDoctor, verifyToken } from './../middlewares/authJWT';
import CreateDoctorController from '../controller/doctorController/createDoctor';
import LoginDoctorController from '../controller/doctorController/loginDoctor';
import Activate from '../controller/doctorController/Activate';
import ProfileController from '../controller/doctorController/ProfileController';
import AllUsers from '../controller/doctorController/getAllUsers';
import ForgotePassword from '../controller/doctorController/forgotPasswordDoctor';
import EnableDoctorController from '../controller/doctorController/enableDoctor';

const routes = Router();


routes.post('/doctorSignUp', CreateDoctorController.createDoctor);
routes.get('/activate/:token',Activate.verifyActivate);
routes.get('/allUser',[verifyToken, isDoctor],AllUsers.getAll);
routes.post('/signInDoctor', LoginDoctorController.signInDoctor);
routes.get('/showProfile', [verifyToken, isDoctor], ProfileController.show);
routes.put('/updateUser/:id', [verifyToken, isDoctor],ProfileController.updateProfile);
routes.put('/updatePassword/:id', ForgotePassword.passwordUpdate);
routes.patch('/enable/:id',[verifyToken, isDoctor],EnableDoctorController.enable);
routes.post('/emailUpdate', ForgotePassword.forgotDoctorPassword);
export default routes;