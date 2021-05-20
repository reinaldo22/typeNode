import {Router} from 'express';
import AllUsers from '../controller/doctorController/getAllUsers';
const routes = Router();

routes.get('/index', AllUsers.todos);

export default routes;