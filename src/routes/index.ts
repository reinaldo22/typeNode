import {Router} from 'express';
import Index from '../controller/index';

const routes = Router();

routes.get('/', Index.index);

export default routes;