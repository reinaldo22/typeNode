import { Router } from 'express';
import { isDoctor, verifyToken } from './../middlewares/authJWT';
import CreateDoctorController from '../controller/doctorController/createDoctor';
import LoginDoctorController from '../controller/doctorController/loginDoctor';
import Activate from '../controller/doctorController/Activate';
import ProfileController from '../controller/doctorController/ProfileController';
import AllUsers from '../controller/doctorController/getAllUsers';

const routes = Router();


routes.post('/doctorSignUp', CreateDoctorController.createDoctor);
routes.get('/activate/:token',Activate.verifyActivate);
routes.get('/allUser',AllUsers.getAll);
routes.post('/signInDoctor', LoginDoctorController.signInDoctor);
routes.get('/showProfile', [verifyToken, isDoctor], ProfileController.show);
routes.put('/updateUser/:id', [verifyToken, isDoctor],ProfileController.updateProfile);

export default routes;